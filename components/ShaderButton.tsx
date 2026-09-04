"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface ShaderButtonProps {
  onClick?: () => void;
  text?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  colors?: [string, string, string, string];
}

// Convert hex to rgb array [0..1]
function hexToRgb(hex: string): [number, number, number] {
  let c = hex.replace("#", "");
  if (c.length === 3) {
    c = c.split("").map((x) => x + x).join("");
  }
  const num = parseInt(c, 16);
  return [
    ((num >> 16) & 255) / 255,
    ((num >> 8) & 255) / 255,
    (num & 255) / 255,
  ];
}

const VERTEX_SHADER = `#version 300 es
in vec2 position;
out vec2 v_uv;
void main() {
    v_uv = (position + 1.0) * 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 fragColor;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_speed;
uniform float u_scale;
uniform float u_turbAmp;
uniform float u_turbFreq;
uniform int u_turbIter;
uniform float u_waveFreq;
uniform vec3 u_colors[4];

// === PCG hash ===
uvec3 hash3(uvec3 v) {
    v = v * 1664525u + 1013904223u;
    v.x += v.y * v.z;
    v.y += v.z * v.x;
    v.z += v.x * v.y;
    v ^= v >> 16u;
    v.x += v.y * v.z;
    v.y += v.z * v.x;
    v.z += v.x * v.y;
    return v;
}

vec3 seedRandom(float seedVal) {
    uvec3 s = uvec3(
        floatBitsToUint(seedVal),
        floatBitsToUint(seedVal * 1.5 + 7.31),
        floatBitsToUint(seedVal * 2.7 + 13.37)
    );
    s = hash3(s);
    return vec3(s) / float(0xFFFFFFFFu);
}

vec3 toLinear(vec3 c) {
    return pow(c, vec3(2.2));
}

vec3 toSrgb(vec3 c) {
    return pow(clamp(c, 0.0, 1.0), vec3(0.4545));
}

vec3 linearToOklab(vec3 c) {
    float l = 0.4122214708 * c.r + 0.5363325363 * c.g + 0.0514459929 * c.b;
    float m = 0.2119034982 * c.r + 0.6806995451 * c.g + 0.1073969566 * c.b;
    float s = 0.0883024619 * c.r + 0.2817188376 * c.g + 0.6299787005 * c.b;
    
    l = pow(max(l, 0.0), 1.0/3.0);
    m = pow(max(m, 0.0), 1.0/3.0);
    s = pow(max(s, 0.0), 1.0/3.0);
    
    return vec3(
        0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
        1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
        0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s
    );
}

vec3 oklabToLinear(vec3 c) {
    float l = c.x + 0.3963377774 * c.y + 0.2158037573 * c.z;
    float m = c.x - 0.1055613458 * c.y - 0.0638541728 * c.z;
    float s = c.x - 0.0894841775 * c.y - 1.2914855480 * c.z;
    
    l = l * l * l;
    m = m * m * m;
    s = s * s * s;
    
    return vec3(
        +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
        -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
        -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
    );
}

vec3 oklabToLch(vec3 lab) {
    return vec3(lab.x, length(lab.yz), atan(lab.z, lab.y));
}

vec3 lchToOklab(vec3 lch) {
    return vec3(lch.x, lch.y * cos(lch.z), lch.y * sin(lch.z));
}

vec3 mixLch(vec3 lab0, vec3 lab1, float t) {
    vec3 lch0 = oklabToLch(lab0);
    vec3 lch1 = oklabToLch(lab1);
    
    if (lch0.y < 0.05) lch0.z = lch1.z;
    if (lch1.y < 0.05) lch1.z = lch0.z;
    
    float dh = lch1.z - lch0.z;
    if (dh > 3.14159265) dh -= 6.28318530;
    if (dh < -3.14159265) dh += 6.28318530;
    
    return lchToOklab(vec3(
        mix(lch0.x, lch1.x, t),
        mix(lch0.y, lch1.y, t),
        lch0.z + dh * t
    ));
}

vec3 paletteN(float t) {
    float segmentSize = 1.0 / 3.0;
    t = clamp(t, 0.0, 1.0);
    int idx = min(int(floor(t / segmentSize)), 2);
    float localT = clamp((t - float(idx) * segmentSize) / segmentSize, 0.0, 1.0);
    
    vec3 c0 = u_colors[idx];
    vec3 c1 = (idx == 0) ? u_colors[1] : ((idx == 1) ? u_colors[2] : u_colors[3]);
    
    vec3 lab0 = linearToOklab(toLinear(c0));
    vec3 lab1 = linearToOklab(toLinear(c1));
    
    return oklabToLinear(mixLch(lab0, lab1, localT));
}

void main() {
    vec2 fragCoord = v_uv * u_resolution;
    vec2 r = u_resolution;
    vec2 p = (fragCoord * 2.0 - r) / r.y;
    
    float t = u_time * 0.3 * u_speed;
    vec3 seedOffset = seedRandom(32.0);
    vec3 seedOffset2 = seedRandom(132.0);
    
    float totalVal = 0.0;
    float totalWeight = 0.0;
    float freq = 1.0 / max(u_turbFreq, 0.01);
    
    for (float i = 0.0; i < 3.0; i++) {
        float eph = (i + 1.0) / 3.0;
        vec2 q = p * u_scale;
        float a = seedOffset2.x * 6.28;
        float d = seedOffset2.y * 6.28;
        
        for (int j = 2; j < 6; j++) {
            float fj = float(j);
            q += u_turbAmp * sin(q.yx / freq * fj + t + vec2(a, d) + seedOffset.xy * fj) / fj;
            a += cos(fj + d * 1.2 + q.x * 2.0 - t + seedOffset2.z);
            d += sin(fj * q.y + a + seedOffset.z + t + seedOffset2.y);
        }
        
        float v = 0.5 + 0.5 * sin(length(q.yx + vec2(a, d) * 0.2) * u_waveFreq + i * i + seedOffset.x);
        float weight = smoothstep(0.0, 0.5, eph) * smoothstep(1.0, 0.5, eph) + 0.1;
        totalVal += v * weight;
        totalWeight += weight;
    }
    
    float val = clamp((totalVal / totalWeight - 0.2) / 0.6, 0.0, 1.0);
    vec3 col = paletteN(val);
    col *= 1.15;
    col = toSrgb(col);
    
    fragColor = vec4(col, 1.0);
}
`;

// Arrow Square Right SVG component matching Framer tL6Nru9eO.js
export const ArrowSquareRightIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="3.75"
      y="3.75"
      width="16.5"
      height="16.5"
      rx="4.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="opacity-80"
    />
    <path
      d="M8.5 12H15.5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.5 9L15.5 12L12.5 15"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ShaderButton: React.FC<ShaderButtonProps> = ({
  onClick,
  text = "ACCESS RECRUITMENT FORM",
  className = "",
  size = "md",
  colors = ["#050811", "#08325a", "#73bfc4", "#ff810a"], // Matches background palette
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);
  const isHoveredRef = useRef(isHovered);

  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl: WebGL2RenderingContext | null = null;
    try {
      gl = canvas.getContext("webgl2", {
        alpha: false,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    if (!gl) {
      setWebglSupported(false);
      return;
    }

    // Compile shader helper
    const compileShader = (type: number, source: string) => {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error("Shader error:", gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) {
      setWebglSupported(false);
      return;
    }

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      setWebglSupported(false);
      return;
    }

    gl.useProgram(program);

    // Quad geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uResLoc = gl.getUniformLocation(program, "u_resolution");
    const uTimeLoc = gl.getUniformLocation(program, "u_time");
    const uSpeedLoc = gl.getUniformLocation(program, "u_speed");
    const uScaleLoc = gl.getUniformLocation(program, "u_scale");
    const uTurbAmpLoc = gl.getUniformLocation(program, "u_turbAmp");
    const uTurbFreqLoc = gl.getUniformLocation(program, "u_turbFreq");
    const uWaveFreqLoc = gl.getUniformLocation(program, "u_waveFreq");
    const uColorsLoc = gl.getUniformLocation(program, "u_colors");

    // Pass colors matching background
    const rgbColors = colors.flatMap(hexToRgb);
    gl.uniform3fv(uColorsLoc, new Float32Array(rgbColors));
    gl.uniform1f(uScaleLoc, 0.45);
    gl.uniform1f(uTurbAmpLoc, 0.6);
    gl.uniform1f(uTurbFreqLoc, 0.12);
    gl.uniform1f(uWaveFreqLoc, 2.5);

    let animationId = 0;
    let startTime = performance.now();
    let isIntersecting = false;

    // Handle resize
    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.floor(rect.width * dpr);
      const height = Math.floor(rect.height * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl?.viewport(0, 0, width, height);
      }
    };
    resize();

    const render = (now: number) => {
      if (!isIntersecting) {
        animationId = 0;
        return;
      }

      const elapsed = (now - startTime) * 0.001;
      gl?.useProgram(program);
      gl?.uniform2f(uResLoc, canvas.width, canvas.height);
      gl?.uniform1f(uTimeLoc, elapsed);
      // Speed up slightly when hovered using ref
      gl?.uniform1f(uSpeedLoc, isHoveredRef.current ? 2.2 : 1.4);

      gl?.drawArrays(gl.TRIANGLES, 0, 6);
      animationId = requestAnimationFrame(render);
    };

    // Pause animation when offscreen to completely eliminate background GPU work
    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      if (isIntersecting) {
        if (!animationId) {
          animationId = requestAnimationFrame(render);
        }
      } else {
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = 0;
        }
      }
    });
    observer.observe(canvas);

    window.addEventListener("resize", resize, { passive: true });

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener("resize", resize);
      observer.disconnect();
      if (gl && program) {
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
      }
    };
  }, [colors]);

  const sizeClasses = {
    sm: "px-6 py-3 text-sm min-h-[50px] gap-3",
    md: "px-8 sm:px-10 py-4 sm:py-4.5 text-base sm:text-lg min-h-[62px] gap-3.5",
    lg: "px-10 sm:px-12 py-4.5 sm:py-5 text-lg sm:text-xl min-h-[72px] gap-4",
  }[size];

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative inline-flex items-center justify-center font-display font-semibold tracking-wide text-white rounded-full overflow-hidden transition-all duration-300 select-none ${sizeClasses} ${className}`}
      style={{
        border: "2px solid rgba(255, 255, 255, 0.28)",
        boxShadow: isHovered
          ? "0 16px 40px -10px rgba(115, 191, 196, 0.4), 0 0 30px -5px rgba(255, 129, 10, 0.35)"
          : "0 10px 30px -8px rgba(0, 0, 0, 0.6), 0 0 20px -5px rgba(115, 191, 196, 0.2)",
      }}
    >
      {/* Background WebGL Shader Canvas */}
      {webglSupported ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none rounded-full"
          style={{
            transform: "scale(1.05)",
            filter: isHovered ? "brightness(1.1) saturate(1.15)" : "brightness(0.95)",
            transition: "filter 0.3s ease",
          }}
        />
      ) : (
        /* CSS Fallback if WebGL2 is disabled */
        <div className="absolute inset-0 bg-gradient-to-r from-[#070b14] via-[#73bfc4] to-[#ff810a] animate-pulse" />
      )}

      {/* Border Glow Layer with hard-light blend mode (matching Framer EcEmmGsem) */}
      <div
        className="absolute inset-0 pointer-events-none rounded-full transition-opacity duration-300"
        style={{
          mixBlendMode: "hard-light",
          backgroundColor: "rgba(10, 16, 30, 0.05)",
          boxShadow: isHovered
            ? "inset 0px 0px 22px 0px rgba(115, 191, 196, 0.85), inset 0px 0px 8px 0px rgba(255, 255, 255, 0.5)"
            : "inset 0px 0px 16px 0px rgba(115, 191, 196, 0.6), inset 0px 0px 4px 0px rgba(255, 255, 255, 0.3)",
        }}
      />

      {/* Top Specular Arc Highlight */}
      <div
        className="absolute top-0 left-0 right-0 h-[45%] pointer-events-none rounded-t-full"
        style={{
          background: "linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.05) 75%, transparent 100%)",
        }}
      />

      {/* Button Content */}
      <span className="relative z-10 text-white font-medium tracking-wider drop-shadow-md flex items-center gap-1">
        {text}
      </span>

      {/* Arrow Square Right Icon (matching Framer component) */}
      <span className="relative z-10 text-white/90 group-hover:text-white transition-all transform group-hover:translate-x-1 duration-200 drop-shadow-md">
        <ArrowSquareRightIcon className={size === "sm" ? "w-4 h-4" : size === "lg" ? "w-6 h-6" : "w-5 h-5"} />
      </span>
    </motion.button>
  );
};

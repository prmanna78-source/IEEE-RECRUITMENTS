export interface DomainItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  skills: string[];
  color: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface PillarItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
}

export interface TimelineItem {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  status: "active" | "upcoming" | "completed";
}

export const siteConfig = {
  name: "IEEE Computer Society GITAM Visakhapatnam",
  shortName: "IEEE CS GITAM",
  recruitmentYear: "2026",
  university: "GITAM Deemed to be University, Visakhapatnam",
  seo: {
    title: "IEEE Computer Society GITAM | Visakhapatnam",
    description: "IEEE Computer Society GITAM Visakhapatnam — a student technology community focused on computing, innovation, collaboration, research and leadership.",
    keywords: ["IEEE", "Computer Society", "GITAM", "Visakhapatnam", "Recruitment 2026", "Student Chapter", "Engineering", "Technology Community"]
  },

  // Editable Impact Stats - No fabricated numbers
  stats: [
    { value: "XX+", label: "Active Members", note: "Passionate student engineers & builders" },
    { value: "XX+", label: "Technical Events", note: "Hackathons, symposiums & challenges" },
    { value: "XX+", label: "Shipped Projects", note: "Open-source & production solutions" },
    { value: "XX+", label: "Hands-on Workshops", note: "Led by peers and industry veterans" },
  ],

  // The 4 Core Pillars
  pillars: [
    {
      number: "01",
      title: "LEARN",
      subtitle: "Workshops & Peer Learning",
      description: "Workshops, technical sessions and peer-to-peer learning designed to bridge the gap between textbook theory and real-world tech stacks.",
      highlights: ["Deep-dive technical sessions", "Guided codebase walkthroughs", "Algorithmic mastery & system architecture"]
    },
    {
      number: "02",
      title: "BUILD",
      subtitle: "Projects & Real-World Code",
      description: "Projects, hackathons and real-world problem solving. We don't just learn concepts in isolation; we deploy functional systems.",
      highlights: ["Competitive hackathon squads", "Collaborative GitHub projects", "End-to-end product deployment"]
    },
    {
      number: "03",
      title: "CONNECT",
      subtitle: "Ecosystem & Collaboration",
      description: "Collaborate with students, developers, researchers and technology enthusiasts across the national and global IEEE network.",
      highlights: ["Global IEEE network access", "Inter-disciplinary cross-pollination", "Direct senior-to-junior mentorship"]
    },
    {
      number: "04",
      title: "LEAD",
      subtitle: "Ownership & Execution",
      description: "Develop leadership, communication and organizational skills by managing large-scale initiatives, technical symposiums, and engineering tracks.",
      highlights: ["Event orchestration & management", "Technical writing & public speaking", "Community governance & leadership"]
    }
  ] as PillarItem[],

  // Technical Domains
  domains: [
    {
      id: "ai-ml",
      title: "AI & MACHINE LEARNING",
      category: "Intelligence",
      tagline: "Explore intelligent systems, machine learning and emerging AI technologies.",
      description: "Delve into neural networks, generative AI models, computer vision, and NLP. Build practical intelligence architectures and conduct deep learning experiments.",
      skills: ["PyTorch", "TensorFlow", "LLMs", "Computer Vision", "Scikit-Learn"],
      color: "from-blue-500/20 to-cyan-500/10"
    },
    {
      id: "web-dev",
      title: "WEB DEVELOPMENT",
      category: "Engineering",
      tagline: "Build modern websites, applications and digital experiences.",
      description: "Architect scalable frontend interfaces and high-concurrency backend services using the modern React/Next.js and Node/Go ecosystems.",
      skills: ["React / Next.js", "TypeScript", "Tailwind CSS", "Node.js", "GraphQL"],
      color: "from-cyan-500/20 to-teal-500/10"
    },
    {
      id: "app-dev",
      title: "APP DEVELOPMENT",
      category: "Mobile",
      tagline: "Create mobile applications and practical products.",
      description: "Craft cross-platform and native mobile software that delivers butter-smooth interactions, offline-first reliability, and ergonomic user flows.",
      skills: ["Flutter", "React Native", "Kotlin", "Swift", "Firebase"],
      color: "from-sky-500/20 to-blue-500/10"
    },
    {
      id: "cybersecurity",
      title: "CYBERSECURITY",
      category: "Security",
      tagline: "Explore secure systems, ethical security and digital defense.",
      description: "Analyze vulnerabilities, reverse-engineer binary applications, practice ethical penetration testing, and compete in Capture The Flag (CTF) tournaments.",
      skills: ["Network Security", "Penetration Testing", "Cryptography", "CTF", "Linux Hardening"],
      color: "from-emerald-500/20 to-cyan-500/10"
    },
    {
      id: "data-cloud",
      title: "DATA & CLOUD",
      category: "Infrastructure",
      tagline: "Work with data, cloud platforms and scalable systems.",
      description: "Deploy distributed pipelines, container orchestration, Kubernetes clusters, and cloud-native infrastructure resilient to heavy traffic.",
      skills: ["Docker / K8s", "AWS / GCP", "PostgreSQL", "Kafka", "CI/CD"],
      color: "from-indigo-500/20 to-blue-500/10"
    },
    {
      id: "competitive-programming",
      title: "COMPETITIVE PROGRAMMING",
      category: "Algorithms",
      tagline: "Strengthen problem-solving, algorithms and data structures.",
      description: "Sharpen algorithmic speed, graph theories, dynamic programming patterns, and represent the chapter in ICPC, Codeforces, and national contests.",
      skills: ["C++ STL", "Advanced Data Structures", "Graph Theory", "Dynamic Programming", "Combinatorics"],
      color: "from-amber-500/20 to-orange-500/10"
    },
    {
      id: "robotics",
      title: "ROBOTICS & AUTONOMOUS SYSTEMS",
      category: "Hardware",
      tagline: "Explore robotics, embedded systems, drones and autonomous technology.",
      description: "Interface microcontrollers, sensors, ROS (Robot Operating System), and embedded computer boards to engineer autonomous mobility and automation.",
      skills: ["ROS 2", "ESP32 / STM32", "Arduino", "Computer Vision", "PCB Design"],
      color: "from-violet-500/20 to-purple-500/10"
    },
    {
      id: "research",
      title: "RESEARCH",
      category: "Academic",
      tagline: "Experiment, investigate and work on innovative technical problems.",
      description: "Collaborate with academic mentors to write, peer-review, and publish cutting-edge computational papers at recognized IEEE conferences.",
      skills: ["Literature Review", "LaTeX", "Data Analysis", "Conference Papers", "Scientific Writing"],
      color: "from-blue-600/20 to-indigo-500/10"
    },
    {
      id: "design-media",
      title: "DESIGN & MEDIA",
      category: "Creative",
      tagline: "Create visual experiences, branding, UI/UX and digital content.",
      description: "Define the visual identity of IEEE CS GITAM. Design modern UI interfaces, motion graphics, video productions, and aesthetic brand assets.",
      skills: ["Figma", "UI / UX Design", "Motion Graphics", "3D / Blender", "Brand Identity"],
      color: "from-rose-500/20 to-pink-500/10"
    },
    {
      id: "events-management",
      title: "EVENTS & MANAGEMENT",
      category: "Operations",
      tagline: "Plan, organize and execute technical community events.",
      description: "Coordinate large hackathons, industry keynotes, logistics, sponsorships, and technical operations that elevate chapter impact.",
      skills: ["Event Operations", "Public Relations", "Budgeting", "Sponsorship Outreach", "Community Strategy"],
      color: "from-teal-500/20 to-emerald-500/10"
    }
  ] as DomainItem[],

  // Why Join IEEE Computer Society Statements
  whyJoin: [
    {
      title: "BUILD REAL PROJECTS",
      tagline: "Go beyond classroom theory.",
      description: "Gain hands-on engineering skills by architecting systems that real students and developers use daily."
    },
    {
      title: "LEARN FROM PEOPLE",
      tagline: "Grow through workshops, communities and collaboration.",
      description: "Get unstuck faster with access to senior mentors, code reviews, and structured learning cohorts."
    },
    {
      title: "MEET LIKE-MINDED STUDENTS",
      tagline: "Find people who are passionate about technology.",
      description: "Form lifelong friendships with ambitious programmers, designers, and innovators who push your standard."
    },
    {
      title: "DEVELOP LEADERSHIP",
      tagline: "Take ownership and organize meaningful initiatives.",
      description: "Manage teams, orchestrate tech fests, and build high-trust collaboration skills that recruiters value."
    },
    {
      title: "EXPLORE EMERGING TECHNOLOGY",
      tagline: "Stay curious about AI, robotics, cybersecurity, cloud and other emerging fields.",
      description: "Stay ahead of industry shifts with early exposure to bleeding-edge tools, research, and paradigms."
    },
    {
      title: "CREATE IMPACT",
      tagline: "Use technology to solve real problems.",
      description: "Leverage engineering to build community tools, mentor juniors, and influence student tech culture."
    }
  ],

  // Recruitment 2026 Timeline
  timeline: [
    {
      step: "01",
      title: "DISCOVER",
      subtitle: "Explore IEEE Computer Society GITAM",
      description: "Explore our technical domains, past projects, chapter culture, and evaluate where your curiosity aligns best.",
      status: "completed"
    },
    {
      step: "02",
      title: "APPLY",
      subtitle: "Submit the appropriate recruitment form",
      description: "Click Access Recruitment Form, choose whether you are in Second Year or Third Year, and submit your official application.",
      status: "active"
    },
    {
      step: "03",
      title: "INTERACTION",
      subtitle: "Shortlisted applicants proceed to the next stage",
      description: "Engage in an informal conversation and domain exploration with our technical leads to discuss your passion, projects, and goals.",
      status: "upcoming"
    },
    {
      step: "04",
      title: "SELECT",
      subtitle: "Selected students become part of the community",
      description: "Official notifications are rolled out to selected candidates welcoming them into the IEEE CS GITAM chapter.",
      status: "upcoming"
    },
    {
      step: "05",
      title: "BUILD",
      subtitle: "Start learning, building and contributing",
      description: "Onboard into active domain squads, attend internal bootcamps, and start shipping projects alongside peer builders.",
      status: "upcoming"
    }
  ] as TimelineItem[],

  // What We Do / Activities
  activities: [
    { title: "Technical Workshops", desc: "Hands-on deep-dives from fundamentals to production architecture." },
    { title: "Hackathons", desc: "Fast-paced sprint competitions solving pressing real-world challenges." },
    { title: "Tech Talks & Keynotes", desc: "Insightful interactions with software architects and researchers." },
    { title: "Coding Competitions", desc: "Algorithmic showdowns sharpening analytical problem-solving." },
    { title: "Project Showcases", desc: "Demonstrations of open-source applications created by members." },
    { title: "Research Initiatives", desc: "Mentored research papers aimed at publication in IEEE Xplore." },
    { title: "Community Meetups", desc: "Unstructured social sessions to brainstorm ideas and build bonds." },
    { title: "Industry Interactions", desc: "Connecting directly with industry leaders and alumni engineers." },
  ],

  // FAQ Section
  faqs: [
    {
      id: "eligibility",
      question: "Who can apply?",
      answer: "Current 2nd year and 3rd year students from GITAM Visakhapatnam who are passionate about technology, software, hardware, design, or community management are eligible to apply."
    },
    {
      id: "experience",
      question: "Do I need previous technical experience?",
      answer: "No prior mastery is mandatory! We value curiosity, consistency, and a strong eagerness to learn above all else. Beginners with genuine interest are strongly encouraged to apply."
    },
    {
      id: "which-year",
      question: "Which year should I select?",
      answer: "Select the academic year you are currently studying in (Second Year or Third Year) when clicking 'Access Recruitment Form'. Each year has a designated form tailored to your academic stage."
    },
    {
      id: "multiple-domains",
      question: "Can I apply to multiple domains?",
      answer: "Yes, you can indicate your primary interest and secondary interests within the recruitment form. We encourage interdisciplinary skills and exploring multiple tracks."
    },
    {
      id: "after-submission",
      question: "What happens after submitting the form?",
      answer: "Our recruitment committee will review all applications and communicate subsequent steps, including interaction rounds and timeline updates, via your registered contact details and official channels."
    }
  ] as FAQItem[],

  // Testimonial placeholder (ready for population or removal)
  testimonialPlaceholder: {
    notice: "Real member testimonials can be updated here by chapter administrators.",
    quotes: [
      {
        quote: "Add real member testimonials here.",
        role: "IEEE CS Core Member",
        domain: "AI/ML Track"
      },
      {
        quote: "Add real member testimonials here.",
        role: "IEEE CS Technical Lead",
        domain: "Web & Cloud Track"
      }
    ]
  }
};

/**
 * IEEE COMPUTER SOCIETY - GITAM VISAKHAPATNAM
 * CENTRALIZED RECRUITMENT FORM CONFIGURATION
 * 
 * Non-technical Chapter Administrators: Replace the placeholder links below
 * with the official Google Form URLs for 2nd and 3rd year applicants.
 */

export const recruitmentForms = {
  // Google Form URL for Second Year (Sophomore) Applicants
  secondYear: "https://forms.gle/gpmqhAeCn9JCvwf98",

  // Google Form URL for Third Year (Junior) Applicants
  thirdYear: "https://forms.gle/ejFHsv5dqnKunQFMA",
};

export type RecruitmentYear = "secondYear" | "thirdYear";

/**
 * Helper to launch the appropriate recruitment Google Form in a new tab securely.
 */
export const openRecruitmentForm = (year: RecruitmentYear) => {
  const url = recruitmentForms[year];
  if (typeof window !== "undefined" && url) {
    window.open(url, "_blank", "noopener,noreferrer");
  }
};

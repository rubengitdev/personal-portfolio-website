export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string; // e.g. "Glean (INTERNSHIP)", "SLACK (INTERNSHIP)", "MEZZO (PASSION PROJECT)"
  tagline: string;
  themeColor: string; // hex color for shadow. e.g. "#4F46E5" for Glean, "#E11D48" for Slack
  shadowColor: string; // shadow class tailwind style e.g. "shadow-[4px_4px_0px_0px_#4f46e5]"
  borderColor: string; // border coloring class
  bgHoverColor: string;
  imageUrl?: string;
  
  // Detailed case study sections
  timeline?: string;
  role?: string;
  team?: string;
  context?: string;
  problem?: string;
  solution?: string;
  opportunityStatement?: string;
  competitiveAnalysis?: {
    competitors: { name: string; logoUrl: string; notes: string }[];
  };
  explorations?: {
    title: string;
    description: string;
    imageSvg?: string;
  }[];
  lessonsLearned?: string[];
}

export interface BioStory {
  longer: { title: string; paragraphs: string[] }[];
}

export interface PhotoReelItem {
  id: string;
  imageUrl: string;
  caption: string;
  ratio: string; // e.g. "aspect-[3/4]"
  location?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  category: "hire" | "collab" | "coffee" | "hello";
  message: string;
  timestamp: string;
}

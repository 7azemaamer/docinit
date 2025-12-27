import type { Question } from "./types";

export const onboardingQuestions: Question[] = [
  {
    id: "projectType",
    question: "What type of project is this?",
    type: "single",
    options: [
      {
        value: "library",
        label: "Library/Package",
        description: "Reusable code for other developers",
      },
      {
        value: "framework",
        label: "Framework",
        description: "Foundation for building applications",
      },
      {
        value: "application",
        label: "Application",
        description: "End-user facing product",
      },
      {
        value: "api",
        label: "API/Backend",
        description: "Web service or backend API",
      },
      {
        value: "design-system",
        label: "Design System",
        description: "UI components and guidelines",
      },
    ],
  },
  {
    id: "features",
    question: "What features does it have?",
    type: "multiple",
    options: [
      { value: "cli", label: "CLI tool" },
      { value: "api", label: "API/SDK" },
      { value: "ui", label: "User interface" },
      { value: "plugins", label: "Plugin system" },
    ],
  },
  {
    id: "audience",
    question: "Who will use these docs?",
    type: "single",
    options: [
      {
        value: "developers",
        label: "Developers",
        description: "Technical audience, code examples",
      },
      {
        value: "end-users",
        label: "End users",
        description: "Non-technical, screenshots & guides",
      },
      {
        value: "both",
        label: "Both",
        description: "Mixed audience",
      },
    ],
  },
];

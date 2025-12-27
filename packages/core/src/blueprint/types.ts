// Core

export type Page = {
  id: string;
  title: string;
  slug: string;
  purpose: string;
  status: "empty" | "completed" | "draft";
  content?: string;
};

export type Section = {
  id: string;
  title: string;
  slug: string;
  pages: Page[];
};

export type Blueprint = {
  id: string;
  slug: string;
  name: string;
  version: string;
  sections: Section[];
};

// Questions
export type QuestionType = "single" | "multiple";

export type QuestionOption = {
  value: string;
  label: string;
  description?: string;
};

export type Question = {
  id: string;
  question: string;
  type: QuestionType;
  options: QuestionOption[];
};

export type OnboardingAnswers = {
  projectName: string;
  projectDescription: string;
  projectType: string;
  features: string[];
  audience: string;
};
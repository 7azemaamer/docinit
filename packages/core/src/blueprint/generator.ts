import type { Blueprint, Section, Page, OnboardingAnswers } from "./types";
import { libraryTemplate } from "./templates/library";
import { apiTemplate } from "./templates/api";
import { designSystemTemplate } from "./templates/design-system";
import { frameworkTemplate } from "./templates/framework";
import { applicationTemplate } from "./templates/application";
import { generateId, slugify } from "../utils";

function createEmptyPage(title: string, purpose: string, index: number): Page {
  const slug = slugify(title);
  return {
    id: `page-${index}`,
    title,
    slug,
    purpose,
    status: "empty",
    content: "",
  };
}

function getTemplateForProjectType(projectType: string): Section[] {
  switch (projectType) {
    case "library":
      return libraryTemplate;
    case "api":
      return apiTemplate;
    case "design-system":
      return designSystemTemplate;
    case "framework":
      return frameworkTemplate;
    case "application":
      return applicationTemplate;
    default:
      return libraryTemplate; // Fallback
  }
}

function enhanceTemplateWithFeatures(
  sections: Section[],
  features: string[]
): Section[] {
  const enhanced = [...sections];

  // Add CLI section if CLI feature is selected
  if (features.includes("cli")) {
    const cliSection: Section = {
      id: `section-cli`,
      title: "CLI Reference",
      slug: "cli-reference",
      pages: [
        createEmptyPage("Commands", "Document available CLI commands", 100),
        createEmptyPage("Options", "Explain command-line options", 101),
        createEmptyPage("Examples", "Provide CLI usage examples", 102),
      ],
    };
    enhanced.push(cliSection);
  }

  // Add API section if API feature is selected
  if (features.includes("api")) {
    const apiSection: Section = {
      id: `section-api`,
      title: "API Reference",
      slug: "api-reference",
      pages: [
        createEmptyPage("Overview", "Introduction to the API", 200),
        createEmptyPage("Authentication", "How to authenticate", 201),
        createEmptyPage("Endpoints", "Available API endpoints", 202),
      ],
    };
    enhanced.push(apiSection);
  }

  // Add UI Components section if UI feature is selected
  if (features.includes("ui")) {
    const uiSection: Section = {
      id: `section-ui`,
      title: "Components",
      slug: "components",
      pages: [
        createEmptyPage("Overview", "Available UI components", 300),
        createEmptyPage("Props", "Component properties", 301),
        createEmptyPage("Examples", "Usage examples", 302),
      ],
    };
    enhanced.push(uiSection);
  }

  // Add Plugins section if plugins feature is selected
  if (features.includes("plugins")) {
    const pluginsSection: Section = {
      id: `section-plugins`,
      title: "Plugins",
      slug: "plugins",
      pages: [
        createEmptyPage("Creating Plugins", "How to build custom plugins", 400),
        createEmptyPage("Plugin API", "Available plugin hooks", 401),
        createEmptyPage("Examples", "Plugin examples", 402),
      ],
    };
    enhanced.push(pluginsSection);
  }

  return enhanced;
}

function enhanceTemplateForAudience(
  sections: Section[],
  audience: string
): Section[] {
  // For end-users, add user-friendly sections
  if (audience === "end-users") {
    const userGuide: Section = {
      id: `section-user-guide`,
      title: "User Guide",
      slug: "user-guide",
      pages: [
        createEmptyPage("Getting Started", "Your first steps", 500),
        createEmptyPage("Basic Usage", "Common tasks", 501),
        createEmptyPage("Troubleshooting", "Common issues and solutions", 502),
      ],
    };
    return [userGuide, ...sections];
  }

  // For both audiences, add sections for both
  if (audience === "both") {
    const gettingStarted: Section = {
      id: `section-getting-started`,
      title: "Getting Started",
      slug: "getting-started",
      pages: [
        createEmptyPage("Quick Start", "Get up and running fast", 600),
        createEmptyPage("For Developers", "Technical setup guide", 601),
        createEmptyPage("For Users", "Non-technical guide", 602),
      ],
    };
    return [gettingStarted, ...sections];
  }

  return sections;
}

export function generateBlueprint(answers: OnboardingAnswers): Blueprint {
  const { projectName, projectDescription, projectType, features, audience } =
    answers;

  // Get base template for project type
  let sections = getTemplateForProjectType(projectType);

  // Enhance based on features
  sections = enhanceTemplateWithFeatures(sections, features);

  // Enhance based on audience
  sections = enhanceTemplateForAudience(sections, audience);

  // Create the blueprint
  const blueprint: Blueprint = {
    id: generateId("blueprint"),
    slug: slugify(projectName),
    name: projectName,
    version: "1.0.0",
    sections,
  };

  return blueprint;
}

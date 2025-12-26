import { Blueprint } from "@docinit/core";

export const mockBlueprint: Blueprint = {
  name: "Docinit Documentation",
  version: "1.0.0",
  sections: [
    {
      id: "getting-started",
      title: "Getting Started",
      slug: "getting-started",
      pages: [
        {
          id: "introduction",
          title: "Introduction",
          slug: "introduction",
          purpose: "Explain what Docinit is and why it exists",
          status: "completed",
          content:
            "# Introduction\n\nDocinit is a blueprint-first documentation framework...",
        },
        {
          id: "installation",
          title: "Installation",
          slug: "installation",
          purpose: "Guide users through setup process",
          status: "completed",
          content: "# Installation\n\n```bash\npnpm add docinit\n```",
        },
        {
          id: "quick-start",
          title: "Quick Start",
          slug: "quick-start",
          purpose: "Help users create their first blueprint",
          status: "draft",
          content:
            "# Quick Start\n\nCreate your first blueprint in 5 minutes...",
        },
      ],
    },
    {
      id: "core-concepts",
      title: "Core Concepts",
      slug: "core-concepts",
      pages: [
        {
          id: "blueprints",
          title: "Blueprints",
          slug: "blueprints",
          purpose: "Explain the blueprint concept and structure",
          status: "completed",
          content:
            "# Blueprints\n\nA blueprint defines the structure of your documentation...",
        },
        {
          id: "sections-and-pages",
          title: "Sections and Pages",
          slug: "sections-and-pages",
          purpose: "Explain how content is organized",
          status: "completed",
          content:
            "# Sections and Pages\n\nDocumentation is organized into sections...",
        },
        {
          id: "page-purpose",
          title: "Page Purpose",
          slug: "page-purpose",
          purpose: "Explain why every page needs a defined purpose",
          status: "draft",
        },
      ],
    },
    {
      id: "builder-ui",
      title: "Builder UI",
      slug: "builder-ui",
      pages: [
        {
          id: "editing-structure",
          title: "Editing Structure",
          slug: "editing-structure",
          purpose: "Show how to add/remove/reorder pages",
          status: "empty",
        },
        {
          id: "writing-content",
          title: "Writing Content",
          slug: "writing-content",
          purpose: "Guide on using the content editor",
          status: "empty",
        },
      ],
    },
  ],
};

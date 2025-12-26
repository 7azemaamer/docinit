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
  name: string;
  version: string;
  sections: Section[];
};

"use client";

import { Page } from "@docinit/core";

export default function PageView({ page }: { page: Page }) {
  return (
    <article>
      <h1>{page.title}</h1>
      <div>{page.content}</div>
    </article>
  );
}

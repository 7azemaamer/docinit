# Docinit

Docinit is an open-source tool for developers who want to stop guessing their documentation structure.

Most projects start documentation by writing markdown.
Docinit starts earlier, by generating a documentation blueprint based on your project.

It does not render docs or write content.
It helps you decide what documentation should exist and why.

---

## Why docinit exists?

Developers usually start documentation by guessing:

- What pages should exist?
- What concepts must be explained?
- What order should things be introduced?
- What will users ask first?

This leads to:

- missing docs
- inconsistent structure
- poor onboarding
- documentation rot

Existing tools focus on **rendering** or **writing** docs.
`docinit` focuses on **planning** them.

---

## What docinit does

`docinit` generates a **documentation blueprint** based on your project.

A blueprint defines:

- which documentation sections are required
- why each section exists
- how sections relate to each other

Example blueprint output:

```txt
docs/
 ├─ getting-started.md
 ├─ installation.md
 ├─ core-concepts/
 │   ├─ architecture.md
 │   ├─ lifecycle.md
 ├─ guides/
 │   ├─ common-patterns.md
 │   ├─ error-handling.md
 ├─ api/
 │   └─ reference.md
 └─ faq.md
```

# Docinit

> **Other tools render your docs. Docinit designs them.**

`Docinit` is a blueprint-first documentation framework for developers.

It lets you design your docs structure, write guided content, and render a
real documentation site — all from a single source of truth.

---

## 1. What is Docinit?

`Docinit` is an open-source documentation framework that starts with structure, not content.

It helps teams **design, write, and publish documentation** starting from a
clear structural blueprint.

### How Docinit is different

| Problem              | Traditional tools      | Docinit                    |
| -------------------- | ---------------------- | -------------------------- |
| What to document?    | You figure it out      | Blueprint generation       |
| Page purpose         | Implicit               | Explicit (per-page intent) |
| Missing content      | Unknown until too late | Highlighted automatically  |
| Structure validation | None                   | Built-in                   |
| Writing experience   | Free-form              | Guided by purpose          |

Traditional documentation tools focus on:

- rendering markdown
- theming
- hosting
- or AI-generated text in isolation

They assume **you already know what to write**.

`Docinit` treats documentation as a **system with intent and structure**.

It answers the questions others skip:

- What documentation should exist?
- Why should each page exist?
- How should content be introduced and ordered?
- What mental model does the reader need?
- What's missing?

The blueprint is the foundation — not the output.

---

## 2. The core problem

Most documentation problems are not writing problems.

They are structural problems:

- missing pages
- missing concepts
- wrong ordering
- assumptions about reader knowledge
- pages with no clear purpose

These problems happen _before_ markdown is written.

Traditional tools start at content.
`Docinit` starts at intent.

---

## 3. Final product vision

At the end, Docinit provides:

1. A **documentation blueprint** (source of truth)
2. A **visual UI to edit that blueprint**
3. A **guided writing experience bound to the blueprint**
4. A **fully rendered documentation website**
5. Optional export for self-hosting or version control

The blueprint always remains the authority.
The rendered docs are a projection of it.

---

## 4. UX model (inspired by Next.js docs)

The documentation UI follows principles used by Next.js documentation:

- left sidebar navigation generated from structure
- clear hierarchy and nesting
- predictable routes
- minimal visual noise
- code-first mindset
- skimmable content

Docinit provides **two connected experiences**:

1. **Builder UI** for authors
2. **Docs UI** for readers

Both are powered by the same underlying blueprint and content.

---

## 5. User flow

### Step 1: Project understanding

The developer either:

- answers a small set of targeted questions
- or lets Docinit detect high-level project signals

Signals reduce friction, but never replace explicit confirmation.

---

### Step 2: Blueprint generation

Based on confirmed capabilities, Docinit generates a documentation blueprint:

- sections
- nested pages
- purpose of each page
- required conceptual ordering

At this stage, no content exists only intent and structure.

---

### Step 3: Blueprint editing (UI)

The developer edits the blueprint visually:

- add or remove pages
- rename sections
- reorder hierarchy
- edit the purpose of each page

---

### Step 4: Guided writing

When writing content:

- each page displays its purpose
- required questions are visible
- missing explanations are highlighted
- common documentation mistakes are surfaced

Writing is guided, not free-form.

---

### Step 5: Rendered documentation

Docinit renders a **real, navigable documentation website** using:

- the blueprint for routing and sidebar
- the written content for pages
- a consistent docs layout

This produces a sharable, production-grade docs site:

- locally for preview
- or hosted for teams and users

Exporting markdown is optional not the core experience.

---

## 6. Core architectural principle

> Intent → Structure → Pages → Content → Rendered Docs

This order must never be reversed.

---

## 7. Monorepo structure

```txt
apps/
 ├─ web/        # Next.js app (builder UI + rendered docs)
 └─ cli/        # CLI for generation, validation, and export

packages/
 ├─ core/       # Domain logic (blueprints, rules, signals)
 ├─ adapters/   # FS, AI, repo analysis (optional, isolated)
 ├─ config/     # Presets and defaults
 └─ ui/         # Shared UI components

docs/           # Docinit documentation (dogfooding)
examples/       # Example projects
```

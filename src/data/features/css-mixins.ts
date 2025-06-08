import type { Feature } from "../index.ts"

export const cssMixinsFeature: Feature = {
  id: "css-mixins",
  blurb:
    "CSS Mixins allow authors to define custom properties that represent a block of styles, which can be applied to other rules.",
  description: [
    "CSS functions are a powerful tool for creating dynamic and reusable styles. They allow you to define styles based on the context in which they are used, making it easier to create responsive and flexible designs.",
  ],
  bodyMarkupData: [
    {
      tag: "h2",
      content: "Getting Started",
      id: "css-mixins",
    },
    {
      tag: "p",
      content:
        "The `@apply` rule was a proposal for CSS that allowed authors to share a set of CSS declarations between rules, similar to mixins in CSS preprocessors like Sass. While `@apply` itself is not currently on the standards track for browsers, the concept of mixins is often achieved using CSS Custom Properties.",
    },
    {
      tag: "p",
      content:
        "Here's how the `@apply` rule was envisioned, and how a similar effect can be achieved with custom properties:",
    },
    {
      tag: "h3",
      content: "Original @apply Proposal (Not Standard)",
    },
    {
      tag: "codeblock",
      language: "css",
      code: `:root {
  --my-theme-styles: {
    background-color: steelblue;
    color: white;
    padding: 10px;
    border-radius: 5px;
  };
}

.button {
  @apply --my-theme-styles;
  border: 1px solid navy; /* Additional specific style */
}

.panel {
  @apply --my-theme-styles;
  margin-bottom: 1em; /* Additional specific style */
}`,
    },
    {
      tag: "p",
      content:
        "In this hypothetical example, `--my-theme-styles` defines a block of styles that are then applied to `.button` and `.panel`.",
    },
    {
      tag: "h3",
      content: "Achieving a Similar Effect with Custom Properties (Standard)",
    },
    {
      tag: "p",
      content:
        "While not a direct replacement for the block-based `@apply`, you can use custom properties to create reusable style snippets, though it's more verbose for multiple properties:",
    },
    {
      tag: "codeblock",
      language: "css",
      code: `:root {
  --button-bg-color: steelblue;
  --button-text-color: white;
  --button-padding: 10px;
  --button-border-radius: 5px;
}

.button {
  background-color: var(--button-bg-color);
  color: var(--button-text-color);
  padding: var(--button-padding);
  border-radius: var(--button-border-radius);
  border: 1px solid navy;
}

.panel {
  background-color: var(--button-bg-color); /* Reusing some properties */
  color: var(--button-text-color);
  padding: var(--button-padding);
  border-radius: var(--button-border-radius);
  margin-bottom: 1em;
}`,
    },
    {
      tag: "p",
      content:
        "For more complex mixin-like behavior, developers often rely on CSS preprocessors or JavaScript-based solutions. The CSS Houdini APIs (like CSS Properties and Values API) also open up new possibilities for dynamic styling that can sometimes serve similar purposes.",
    },
  ],
  links: [
    {
      label: "Chrome Status",
      link: "https://chromestatus.com/feature/5753701012602880",
      type: "spec",
    },
    {
      label: "CSS Mixins (CSSWG)",
      link: "https://github.com/w3c/csswg-drafts/issues/323",
      type: "github",
    },
  ],
  slug: "css-mixins",
  tags: ["css"],
  title: "CSS Mixins Module",
  type: "css",
}

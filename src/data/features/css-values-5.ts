import type { Feature } from "../index.ts"

export const cssValues5Feature: Feature = {
  id: "css-values-5",
  blurb:
    "CSS Values and Units Module Level 5 introduces new CSS value types and units, enhancing the expressiveness of CSS.",
  description: [
    "CSS Values and Units Module Level 5 introduces new ways to specify values and units in CSS, building upon previous levels.",
  ],
  bodyMarkupData: [
    {
      tag: "h2",
      content: "Getting Started",
      id: "css-values-5",
    },
    {
      tag: "p",
      content:
        "CSS Values and Units Level 5 continues to expand the range of values and units available to CSS authors, allowing for more sophisticated and responsive designs. While specific features can vary as the specification evolves, it generally includes enhancements to mathematical functions and new ways to define lengths and other values.",
    },
    {
      tag: "p",
      content: "Key areas of development often include:",
    },
    {
      tag: "ul",
      items: [
        "<strong>Trigonometric functions:</strong> `sin()`, `cos()`, `tan()`, `asin()`, `acos()`, `atan()`, and `atan2()` for use within `calc()`.",
        "<strong>Step-value functions:</strong> Such as `round()`, `mod()`, and `rem()` for more control over calculated values.",
        "<strong>New viewport units:</strong> Potentially units that account for dynamic browser UI elements (e.g., dynamic viewports).",
        "<strong>Extended color functions:</strong> Further enhancements to color manipulation in CSS.",
      ],
    },
    {
      tag: "h3",
      content: "Example: Trigonometric Functions",
    },
    {
      tag: "p",
      content:
        "Trigonometric functions can be used within `calc()` to create complex geometric effects or dynamic layouts.",
    },
    {
      tag: "codeblock",
      language: "css",
      code: `.element {
  /* Example: Rotate an element based on a custom property */
  --angle: 30deg;
  transform: rotate(calc(sin(var(--angle)) * 45deg)); /* Hypothetical use */
  
  /* Example: Position an item on a circle */
  --radius: 100px;
  --item-angle: 45deg;
  left: calc(var(--radius) * cos(var(--item-angle)));
  top: calc(var(--radius) * sin(var(--item-angle)));
}`,
    },
    {
      tag: "h3",
      content: "Example: Step-Value Functions",
    },
    {
      tag: "p",
      content:
        "The `round()` function can be used to snap values to a certain stepping interval.",
    },
    {
      tag: "codeblock",
      language: "css",
      code: `.container {
  --base-font-size: 15.5px;
  /* Round the font size to the nearest integer pixel value */
  font-size: calc(round(nearest, var(--base-font-size), 1px)); /* Will be 16px */
}

.item {
  /* Ensure width is always a multiple of 10px */
  width: calc(round(nearest, 33%, 10px)); 
}`,
    },
    {
      tag: "p",
      content:
        "As CSS Values and Units Level 5 is an evolving specification, browser support for individual features will vary. It's important to check resources like MDN or Can I use for the latest compatibility information.",
    },
  ],
  links: [
    {
      label: "W3C Working Draft",
      link: "https://www.w3.org/TR/css-values-5/",
      type: "spec",
    },
    {
      label: "MDN Documentation",
      link:
        "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units",
      type: "docs",
    },
  ],
  slug: "css-values-5",
  tags: ["css"],
  title: "CSS Values & Units Level 5",
  type: "css",
}

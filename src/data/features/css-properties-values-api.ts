import type { Feature } from "../index.ts"

export const cssPropertiesValuesApiFeature: Feature = {
  id: "css-properties-values-api",
  blurb:
    "The CSS Properties and Values API allows developers to register custom CSS properties, defining their syntax, initial value, and inheritance behavior.",
  description: [
    "The CSS Properties and Values API is part of the CSS Houdini umbrella of APIs.",
  ],
  bodyMarkupData: [
    {
      tag: "h2",
      content: "Getting Started",
      id: "css-properties-values-api",
    },
    {
      tag: "p",
      content:
        "The CSS Properties & Values API allows developers to explicitly define their custom CSS properties, specifying their type, initial value, and inheritance behavior. This provides more control and enables new possibilities like animated custom properties.",
    },
    {
      tag: "p",
      content: "First, you register a custom property using JavaScript:",
    },
    {
      tag: "codeblock",
      language: "javascript",
      code: `if (typeof CSS !== 'undefined' && CSS.registerProperty) {
  CSS.registerProperty({
    name: '--my-color',
    syntax: '<color>',
    initialValue: 'black',
    inherits: false
  });
} else {
  console.log("CSS.registerProperty is not supported in this browser.");
}`,
    },
    {
      tag: "p",
      content:
        "In this example, we register a custom property named `--my-color`. We define its syntax as a color, set its initial value to 'black', and specify that it does not inherit.",
    },
    {
      tag: "p",
      content: "Then, you can use this registered property in your CSS:",
    },
    {
      tag: "codeblock",
      language: "css",
      code: `.my-element {
  --my-color: blue;
  background-color: var(--my-color);
  transition: --my-color 1s;
}

.my-element:hover {
  --my-color: red;
}`,
    },
    {
      tag: "p",
      content:
        "Because `--my-color` is registered with a defined syntax (e.g., '<color>'), the browser understands how to interpolate it, allowing for smooth transitions and animations.",
    },
  ],
  links: [
    {
      label: "W3C Draft Specification",
      link: "https://drafts.css-houdini.org/css-properties-values-api",
      type: "spec",
    },
    {
      label: "Web.dev Article",
      link:
        "https://web.dev/articles/css-props-and-vals#css_properties_and_values_api_level_1",
      type: "github",
    },
  ],
  slug: "css-properties-values-api",
  tags: ["cssom"],
  title: "CSS Properties & Values API",
  type: "cssom",
}

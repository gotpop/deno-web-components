import { Feature } from "./data-types.ts"

export const cssomFeaturesMap = new Map()
  .set("css-paint-api", {
    description:
      "The CSS Paint API allows developers to programmatically generate images that can be used as CSS backgrounds, borders, masks, and more, directly in JavaScript",
    layout: {
      columns: 12,
      rows: 1,
      "feature-start": 4,
      "feature-end": 10,
      "row-start": 32,
      "row-end": 40,
    },
    links: [
      {
        label: "W3C Specification",
        link: "https://drafts.css-houdini.org/css-paint-api/",
        type: "spec",
      },
      {
        label: "MDN Documentation",
        link:
          "https://developer.mozilla.org/en-US/docs/Web/API/CSS_Painting_API",
        type: "docs",
      },
    ],
    slug: "css-paint-api",
    tags: ["cssom"],
    title: "CSS Paint API",
    type: "cssom",
  })
  .set("css-layout-api", {
    description:
      "The CSS Layout API allows developers to create custom layout algorithms that can be used alongside CSS's built-in algorithms like flexbox and grid",
    layout: {
      columns: 12,
      rows: 1,
      "feature-start": 2,
      "feature-end": 10,
      "row-start": 32,
      "row-end": 40,
    },
    links: [
      {
        label: "W3C Specification",
        link: "https://drafts.css-houdini.org/css-layout-api/",
        type: "spec",
      },
      {
        label: "GitHub Repository",
        link:
          "https://github.com/w3c/css-houdini-drafts/tree/main/css-layout-api",
        type: "github",
      },
    ],
    slug: "css-layout-api",
    tags: ["cssom"],
    title: "CSS Layout API",
    type: "cssom",
  })

export const cssomFeatures: Feature[] = Array.from(
  cssomFeaturesMap.values(),
)

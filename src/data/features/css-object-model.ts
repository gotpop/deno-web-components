import { Feature } from "./data-types.ts"

export const cssomFeaturesMap = new Map()
  .set("css-paint-api", {
    tags: ["cssom"],
    layout: {
      columns: 12,
      rows: 1,
      "feature-start": 2,
      "feature-end": 10,
    },
    title: "CSS Paint API",
    description:
      "The CSS Paint API allows developers to programmatically generate images that can be used as CSS backgrounds, borders, masks, and more, directly in JavaScript",
    slug: "css-paint-api",
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
  })
  .set("css-layout-api", {
    tags: ["cssom"],
    layout: {
      columns: 12,
      rows: 1,
      "feature-start": 2,
      "feature-end": 10,
    },
    title: "CSS Layout API",
    description:
      "The CSS Layout API allows developers to create custom layout algorithms that can be used alongside CSS's built-in algorithms like flexbox and grid",
    slug: "css-layout-api",
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
  })

export const cssomFeatures: Feature[] = Array.from(
  cssomFeaturesMap.values(),
)

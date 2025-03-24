import { Feature } from "./data-types.ts"

export const cssomFeaturesMap = new Map()
  .set("css-paint-api", {
    description:
      "The CSS Paint API allows developers to programmatically generate images that can be used as CSS backgrounds, borders, masks, and more, directly in JavaScript",
    layout: {
      columns: 13,
      rows: 1,
      "feature-start": 4,
      "feature-end": 11,
      "row-start": 7,
      "row-end": 8,
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
  .set("css-typed-om", {
    description:
      "Converting CSSOM value strings into meaningfully typed JavaScript representations and back can incur a significant performance overhead. This specification exposes CSS values as typed JavaScript objects, to make manipulating them both easier and more performant.",
    layout: {
      columns: 12,
      rows: 1,
      "feature-start": 3,
      "feature-end": 10,
      "row-start": 7,
      "row-end": 8,
    },
    links: [
      {
        label: "W3C Draft Specification",
        link: "https://drafts.css-houdini.org/css-typed-om",
        type: "spec",
      },
    ],
    slug: "css-typed-om",
    tags: ["cssom"],
    title: "CSS Typed OM",
    type: "cssom",
  })
  .set("css-properties-values-api", {
    description:
      "This CSS module defines an API for registering new CSS properties. Properties registered using this API are provided with a parse syntax that defines a type, inheritance behaviour, and an initial value.",
    layout: {
      columns: 15,
      rows: 1,
      "feature-start": 3,
      "feature-end": 10,
      "row-start": 7,
      "row-end": 8,
    },
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
    title: "CSS Properties and Values API",
    type: "cssom",
  })

export const cssomFeatures: Feature[] = Array.from(
  cssomFeaturesMap.values(),
)

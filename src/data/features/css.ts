import { Feature } from "./data-types.ts"

export const cssFeaturesMap = new Map()
  .set("css-mixins", {
    tags: ["css"],
    layout: {
      columns: 14,
      rows: 1,
      "feature-start": 4,
      "feature-end": 11,
    },
    title: "CSS Functions and Mixins Module",
    links: [
      {
        label: "CSS Working Group Draft",
        link: "https://drafts.csswg.org/css-mixins",
        type: "spec",
      },
    ],
    description:
      "CSS functions are a powerful tool for creating dynamic and reusable styles. They allow you to define styles based on the context in which they are used, making it easier to create responsive and flexible designs.",
    slug: "css-mixins",
  })
  .set("css-values-5", {
    tags: ["css"],
    layout: {
      columns: 14,
      rows: 1,
      "feature-start": 2,
      "feature-end": 10,
    },
    title: "Expanded attr() notation",
    description:
      "Expanded attr() is a powerful tool for creating dynamic and reusable styles. They allow you to define styles based on the context in which they are used, making it easier to create responsive and flexible designs",
    slug: "css-values-5",
    links: [
      {
        label: "CSS Values Level 5",
        link: "https://drafts.csswg.org/css-values-5/#attr-notation",
        type: "spec",
      },
    ],
  })
  .set("css-anchor-position-1", {
    tags: ["css"],
    layout: {
      columns: 14,
      rows: 1,
      "feature-start": 4,
      "feature-end": 11,
    },
    label: "Title 4",
    title: "Anchor positioning",
    description:
      "Anchor positioning is a powerful tool for creating dynamic and reusable styles. They allow you to define styles based on the context in which they are used, making it easier to create responsive and flexible designs",
    slug: "css-anchor-position-1",
    links: [
      {
        label: "CSS Working Group Draft",
        link: "https://drafts.csswg.org/css-anchor-position-1",
        type: "spec",
      },
      {
        label: "MDN Documentation",
        link:
          "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning",
        type: "docs",
      },
    ],
  })
  .set("css-scoping", {
    tags: ["css"],
    layout: {
      columns: 14,
      rows: 1,
      "feature-start": 2,
      "feature-end": 10,
    },
    label: "Title 6",
    title: "@scope rule",
    description:
      "@scope rule is a powerful tool for creating dynamic and reusable styles. They allow you to define styles based on the context in which they are used, making it easier to create responsive and flexible designs",
    slug: "css-scoping",
    links: [
      {
        label: "CSS Working Group Draft",
        link: "https://drafts.csswg.org/css-cascade-6/#scoped-styles",
        type: "spec",
      },
    ],
  })

export const cssFeatures: Feature[] = Array.from(cssFeaturesMap.values())

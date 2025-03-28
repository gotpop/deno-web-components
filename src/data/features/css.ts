import { Feature } from "./data-types.ts"

export const cssFeaturesMap = new Map()
  .set("css-mixins", {
    description:
      "CSS functions are a powerful tool for creating dynamic and reusable styles. They allow you to define styles based on the context in which they are used, making it easier to create responsive and flexible designs.",
    layout: {
      columns: 14,
      "column-start": 1,
      "column-end": 14,
      rows: 2,
      "row-start": 2,
      "row-end": 2,
      "feature-start": 4,
      "feature-end": 11,
    },
    links: [
      {
        label: "CSS Working Group Draft",
        link: "https://drafts.csswg.org/css-mixins",
        type: "spec",
      },
    ],
    slug: "css-mixins",
    tags: ["css"],
    title: "CSS Functions and Mixins Module",
    type: "css",
  })
  .set("css-values-5", {
    description:
      "Expanded attr() is a powerful tool for creating dynamic and reusable styles. They allow you to define styles based on the context in which they are used, making it easier to create responsive and flexible designs",
    layout: {
      columns: 15,
      "column-start": 13,
      "column-end": 26,
      rows: 3,

      "feature-start": 4,
      "feature-end": 12,
      "row-start": 2,
      "row-end": 3,
    },
    links: [
      {
        label: "CSS Values Level 5",
        link: "https://drafts.csswg.org/css-values-5/#attr-notation",
        type: "spec",
      },
    ],
    slug: "css-values-5",
    tags: ["css"],
    title: "Expanded attr() notation",
    type: "css",
  })
  .set("css-anchor-position-1", {
    description:
      "Anchor positioning is a powerful tool for creating dynamic and reusable styles. They allow you to define styles based on the context in which they are used, making it easier to create responsive and flexible designs",
    label: "Title 4",
    layout: {
      columns: 15,
      "column-start": 23,
      "column-end": 41,
      rows: 3,
      "feature-start": 6,
      "feature-end": 13,
      "row-start": 2,
      "row-end": 3,
    },
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
    slug: "css-anchor-position-1",
    tags: ["css"],
    title: "CSS Anchor positioning",
    type: "css",
  })
  .set("css-scoping", {
    description:
      "@scope rule is a powerful tool for creating dynamic and reusable styles. They allow you to define styles based on the context in which they are used, making it easier to create responsive and flexible designs",
    label: "Title 6",
    layout: {
      columns: 14,
      rows: 3,
      "feature-start": 4,
      "feature-end": 12,
      "row-start": 4,
      "row-end": 5,
    },
    links: [
      {
        label: "CSS Working Group Draft",
        link: "https://drafts.csswg.org/css-cascade-6/#scoped-styles",
        type: "spec",
      },
    ],
    slug: "css-scoping",
    tags: ["css"],
    title: "@scope rule",
    type: "css",
  })
  .set("css-scoping replace me", {
    description:
      "@scope rule is a powerful tool for creating dynamic and reusable styles. They allow you to define styles based on the context in which they are used, making it easier to create responsive and flexible designs",
    label: "Title 6",
    layout: {
      columns: 30,
      rows: 3,
      "feature-start": 2,
      "feature-end": 10,
      "row-start": 4,
      "row-end": 5,
    },
    links: [
      {
        label: "CSS Working Group Draft",
        link: "https://drafts.csswg.org/css-cascade-6/#scoped-styles",
        type: "spec",
      },
    ],
    slug: "css-scoping2",
    tags: ["css"],
    title: "@scope rule (replace me)",
    type: "css",
  })

export const cssFeatures: Feature[] = Array.from(cssFeaturesMap.values())

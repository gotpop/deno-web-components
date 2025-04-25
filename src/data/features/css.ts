import { Feature } from "./data-types.ts"

export const cssFeaturesMap = new Map()
  .set("css-mixins", {
    description: [
      "CSS functions are a powerful tool for creating dynamic and reusable styles.",
      "They allow you to define styles based on the context in which they are used, making it easier to create responsive and flexible designs.",
    ],
    layout: {
      "content-end": 13,
      "content-start": 2,
      "item-end": 14,
      "item-start": 1,
      "row-position": 2,
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
    title: "CSS Functions & Mixins Module",
    type: "css",
  })
  .set("css-values-5", {
    description: [
      "Expanded attr() is a powerful tool for creating dynamic and reusable styles.",
      "They allow you to define styles based on the context in which they are used, making it easier to create responsive and flexible designs.",
    ],
    layout: {
      "content-end": 13,
      "content-start": 2,
      "item-end": 26,
      "item-start": 13,
      "row-position": 2,
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
    description: [
      "Anchor positioning is a powerful tool for creating dynamic and reusable styles.",
      "They allow you to define styles based on the context in which they are used, making it easier to create responsive and flexible designs.",
    ],
    label: "Title 4",
    layout: {
      "content-end": 15,
      "content-start": 4,
      "item-end": 41,
      "item-start": 23,
      "row-position": 2,
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
    description: [
      "@scope rule is a powerful tool for creating dynamic and reusable styles.",
      " They allow you to define styles based on the context in which they are used, making it easier to create responsive and flexible designs.",
    ],
    label: "Title 6",
    layout: {
      "content-end": 13,
      "content-start": 2,
      "item-end": 14,
      "item-start": 1,
      "row-position": 3,
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
    title: "@scope rule new text",
    type: "css",
  })
  .set("css-scoping2", {
    description: [
      "@scope rule is a powerful tool for creating dynamic and reusable styles.",
      "They allow you to define styles based on the context in which they are used, making it easier to create responsive and flexible designs.",
    ],
    label: "Title 6",
    layout: {
      "content-end": 13,
      "content-start": 2,
      "item-end": 26,
      "item-start": 13,
      "row-position": 3,
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
  .set("css-scoping3", {
    description: [
      "@scope rule is a powerful tool for creating dynamic and reusable styles.",
      "They allow you to define styles based on the context in which they are used, making it easier to create responsive and flexible designs.",
    ],
    label: "Title 6",
    layout: {
      "content-end": 15,
      "content-start": 4,
      "item-end": 41,
      "item-start": 23,
      "row-position": 3,
    },
    links: [
      {
        label: "CSS Working Group Draft",
        link: "https://drafts.csswg.org/css-cascade-6/#scoped-styles",
        type: "spec",
      },
    ],
    slug: "css-scoping3",
    tags: ["css"],
    title: "@scope rule (replace me)",
    type: "css",
  })

export const cssFeatures: Feature[] = Array.from(cssFeaturesMap.values())

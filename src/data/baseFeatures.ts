type Layout = {
  columns: number
  rows: number
  "feature-start": number
  "feature-end": number
}

type Link = {
  label: string
  link: string
  type: "spec" | "docs" | "github"
}

export type Feature = {
  layout: Layout
  title: string
  description: string
  slug: string
  links: Link[]
  label?: string
}

export const baseFeaturesMap = new Map()
  .set("css-mixins", {
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
  .set("css-view-transitions-2", {
    layout: {
      columns: 12,
      rows: 1,
      "feature-start": 2,
      "feature-end": 10,
    },
    title: "Cross document view transitions",
    description:
      "Cross-document view transitions are a powerful tool for creating dynamic and reusable styles. They allow you to define styles based on the context in which they are used, making it easier to create responsive and flexible designs",
    slug: "css-view-transitions-2",
    links: [
      {
        label: "W3C Specification",
        link: "https://www.w3.org/TR/css-view-transitions-2/",
        type: "spec",
      },
    ],
  })
  .set("css-values-5", {
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
  .set("custom-elements", {
    layout: {
      columns: 12,
      rows: 1,
      "feature-start": 2,
      "feature-end": 10,
    },
    label: "Title 5",
    title: "Custom elements",
    description:
      "Custom elements are a powerful tool for creating dynamic and reusable styles. They allow you to define styles based on the context in which they are used, making it easier to create responsive and flexible designs",
    slug: "custom-elements",
    links: [
      {
        label: "MDN Documentation",
        link:
          "https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements",
        type: "docs",
      },
      {
        label: "Web Components Repository",
        link: "https://github.com/WICG/webcomponents",
        type: "github",
      },
    ],
  })
  .set("css-scoping", {
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

export const baseFeatures: Feature[] = Array.from(baseFeaturesMap.values())

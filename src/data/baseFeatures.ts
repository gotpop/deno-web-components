export const baseFeatures = [
  {
    id: "grid-item-1",
    label: "Title 1",
    columns: 12,
    rows: 4,
    title: "CSS functions",
    description:
      "CSS functions are a powerful tool for creating dynamic and reusable styles. They allow you to define styles based on the context in which they are used, making it easier to create responsive and flexible designs.",
    titleTag: "h2",
    slug: "css-functions",
  },
  {
    id: "grid-item-2",
    label: "Title 2",
    columns: 4,
    rows: 2,
    title: "Cross document view transitions",
    description:
      "Cross-document view transitions are a powerful tool for creating dynamic and reusable styles. They allow you to define styles based on the context in which they are used, making it easier to create responsive and flexible designs",
    titleTag: "h3",
    slug: "cross-document-view-transitions",
  },
  {
    id: "grid-item-3",
    label: "Title 3",
    columns: 2,
    rows: 2,
    title: "Expanded attr()",
    description:
      "Expanded attr() is a powerful tool for creating dynamic and reusable styles. They allow you to define styles based on the context in which they are used, making it easier to create responsive and flexible designs",
    titleTag: "h3",
    slug: "expanded-attr",
  },
  {
    id: "grid-item-4",
    label: "Title 4",
    columns: 2,
    rows: 2,
    title: "Anchor positioning",
    description:
      "Anchor positioning is a powerful tool for creating dynamic and reusable styles. They allow you to define styles based on the context in which they are used, making it easier to create responsive and flexible designs",
    titleTag: "h3",
    slug: "anchor-positioning",
  },
  {
    id: "grid-item-5",
    label: "Title 5",
    columns: 4,
    rows: 2,
    title: "Custom elements",
    description:
      "Custom elements are a powerful tool for creating dynamic and reusable styles. They allow you to define styles based on the context in which they are used, making it easier to create responsive and flexible designs",
    titleTag: "h3",
    slug: "custom-elements",
  },
  {
    id: "grid-item-6",
    label: "Title 6",
    columns: 12,
    rows: 2,
    title: "@scope rule",
    description:
      "@scope rule is a powerful tool for creating dynamic and reusable styles. They allow you to define styles based on the context in which they are used, making it easier to create responsive and flexible designs",
    titleTag: "h3",
    slug: "scope-rule",
  },
]

export type Feature = typeof baseFeatures[number]

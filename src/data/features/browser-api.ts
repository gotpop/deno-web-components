import { Feature } from "./data-types.ts"

export const browserApiFeaturesMap = new Map()
  .set("css-view-transitions-2", {
    description:
      "Cross-document view transitions are a powerful tool for creating dynamic and reusable styles. They allow you to define styles based on the context in which they are used, making it easier to create responsive and flexible designs",
    layout: {
      columns: 13,
      "column-start": 1,
      "column-end": 14,
      "feature-end": 11,
      "feature-start": 4,
      "row-start": 6,
      "row-end": 7,
      rows: 1,
    },
    links: [
      {
        label: "W3C Specification",
        link: "https://www.w3.org/TR/css-view-transitions-2",
        type: "spec",
      },
    ],
    slug: "css-view-transitions-2",
    tags: ["browser-api"],
    title: "Cross document view transitions",
    type: "bapi",
  })
  .set("custom-elements", {
    description:
      "Custom elements are a powerful tool for creating dynamic and reusable styles. They allow you to define styles based on the context in which they are used, making it easier to create responsive and flexible designs",
    layout: {
      columns: 12,
      "column-start": 13,
      "column-end": 26,
      "feature-end": 10,
      "feature-start": 3,
      rows: 1,
      "row-start": 6,
      "row-end": 7,
    },
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
    slug: "custom-elements",
    tags: ["browser-api"],
    title: "Custom elements",
    type: "bapi",
  })
  .set("popover api", {
    description:
      "Custom elements are a powerful tool for creating dynamic and reusable styles. They allow you to define styles based on the context in which they are used, making it easier to create responsive and flexible designs",
    layout: {
      columns: 15,
      "column-start": 23,
      "column-end": 41,
      "feature-end": 10,
      "feature-start": 3,
      rows: 1,
      "row-start": 6,
      "row-end": 7,
    },
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
    slug: "popover api",
    tags: ["browser-api"],
    title: "Popover API",
    type: "bapi",
  })

export const browserApiFeatures: Feature[] = Array.from(
  browserApiFeaturesMap.values(),
)

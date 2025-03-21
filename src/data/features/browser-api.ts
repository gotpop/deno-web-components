import { Feature } from "./data-types.ts"

export const browserApiFeaturesMap = new Map()
  .set("css-view-transitions-2", {
    tags: ["browser-api"],
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
  .set("custom-elements", {
    tags: ["browser-api"],
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

export const browserApiFeatures: Feature[] = Array.from(
  browserApiFeaturesMap.values(),
)

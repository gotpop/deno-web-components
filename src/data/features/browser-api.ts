import { Feature } from "./data-types.ts"

export const browserApiFeaturesMap = new Map()
  .set("css-view-transitions-2", {
    description: [
      "Cross-document view transitions are a powerful tool for creating dynamic and reusable styles.",
      "They allow you to define styles based on the context in which they are used, making it easier to create responsive and flexible designs",
    ],
    layout: {
      "item-end": 13,
      "item-start": 4,
      "row-position": 7,
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
    description: [
      "Custom elements are a powerful tool for creating dynamic and reusable styles.",
      "They allow you to define styles based on the context in which they are used, making it easier to create responsive and flexible designs",
    ],
    layout: {
      "item-start": 16,
      "item-end": 25,
      "row-position": 7,
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
    description: [
      "Custom elements are a powerful tool for creating dynamic and reusable styles.",
      "They allow you to define styles based on the context in which they are used, making it easier to create responsive and flexible designs",
    ],
    layout: {
      "item-end": 37,
      "item-start": 28,
      "row-position": 7,
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

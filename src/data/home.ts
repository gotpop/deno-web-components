import { allFeatures } from "./features/index.ts"

const filteredFeaturesBrowserApi = allFeatures.filter((feature) =>
  feature.tags.includes("browser-api")
)

const filteredFeaturesCss = allFeatures.filter((feature) =>
  feature.tags.includes("css")
)

const filteredFeaturesCssom = allFeatures.filter((feature) =>
  feature.tags.includes("cssom")
)

export const homeData = {
  features: {
    browserApiFeatures: filteredFeaturesBrowserApi,
    cssFeatures: filteredFeaturesCss,
    cssomFeatures: filteredFeaturesCssom,
  },
  bodyMarkupData: [
    {
      tag: "h2",
      content: "Welcome to the Web Platform Features Explorer",
      id: "welcome-to-the-web-platform-features-explorer",
    },
    {
      tag: "p",
      content:
        "Explore the features of the web platform, including CSS, JavaScript APIs, and more.",
    },
    {
      tag: "h2",
      content: "What is the Web Platform?",
      id: "what-is-the-web-platform",
    },
    {
      tag: "p",
      content:
        "The web platform is a collection of technologies that enable developers to create rich, interactive web applications. It includes HTML, CSS, JavaScript, and various APIs that allow developers to access device capabilities and create dynamic user experiences.",
    },
  ],
}

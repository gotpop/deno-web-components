export interface Feature {
  id: string
  title: string
  description: string
  slug: string
}

export const featuresData = {
  title: "Features",
  description: "Explore our features",
  features: [
    {
      id: "1",
      title: "Web Components",
      description: "Native web components without frameworks",
      slug: "web-components",
    },
    {
      id: "2",
      title: "Deno Runtime",
      description: "Modern JavaScript/TypeScript runtime",
      slug: "deno-runtime",
    },
  ],
}

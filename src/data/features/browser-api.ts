import { Feature } from "./data-types.ts"

export const browserApiFeaturesMap = new Map()
  .set("css-view-transitions-2", {
    description: [
      "Cross-document view transitions are a powerful tool for creating dynamic and reusable styles.",
      "They allow you to define styles based on the context in which they are used, making it easier to create responsive and flexible designs",
    ],
    bodyMarkupData: [
      {
        tag: "h2",
        content: "About Us",
        id: "about-us",
      },
      {
        tag: "p",
        content:
          "We are a small team of developers who are passionate about creating high-quality software. We specialize in web development and are always looking for new projects to work on.",
      },
      {
        tag: "p",
        content:
          "Our goal is to provide our clients with the best possible solutions for their needs. We take pride in our work and strive to deliver the best possible results on every project.",
      },
      {
        tag: "codeblock",
        language: "html",
        code: `<button variant="md">Click me!</button>`,
      },
      {
        tag: "p",
        content:
          "If you have a project that you would like to discuss with us, please feel free to reach out to us. We would love to hear from you and see how we can help.",
      },
      {
        tag: "h3",
        content: "Our Team",
        id: "our-team",
      },
      {
        tag: "p",
        content:
          "Our team is made up of experienced developers who are passionate about creating high-quality software. We have a diverse set of skills and are always looking for new challenges to take on.",
      },
      {
        tag: "p",
        content:
          "We are dedicated to providing our clients with the best possible solutions for their needs. We take pride in our work and strive to deliver the best possible results on every project.",
      },
      {
        tag: "p",
        content:
          "If you have a project that you would like to discuss with us, please feel free to reach out to us. We would love to hear from you and see how we can help.",
      },
      {
        tag: "p",
        content:
          "Our team fosters a collaborative culture where innovation thrives. We combine technical expertise with creative problem-solving to tackle complex challenges.",
      },
      {
        tag: "p",
        content:
          "With diverse backgrounds and complementary skill sets, we approach each project from multiple perspectives to ensure comprehensive solutions that exceed expectations.",
      },
      {
        tag: "h3",
        content: "Our Mission",
        id: "our-mission",
      },
      {
        tag: "p",
        content:
          "Our mission is to provide our clients with the best possible solutions for their needs. We take pride in our work and strive to deliver the best possible results on every project.",
      },
      {
        tag: "p",
        content:
          "We are dedicated to providing our clients with the best possible solutions for their needs. We take pride in our work and strive to deliver the best possible results on every project.",
      },
      {
        tag: "p",
        content:
          "If you have a project that you would like to discuss with us, please feel free to reach out to us. We would love to hear from you and see how we can help.",
      },
      {
        tag: "p",
        content:
          "We aim to stay at the forefront of technology by continuously learning and adapting to industry changes. Our long-term vision is to build lasting partnerships through consistent value delivery.",
      },
      {
        tag: "p",
        content:
          "Innovation drives everything we do - from our development processes to the final products we create. We believe in sustainable growth that benefits both our clients and our team.",
      },
      {
        tag: "h3",
        content: "Our Values",
        id: "our-values",
      },
      {
        tag: "p",
        content:
          "Our values are at the core of everything we do. We believe in honesty, integrity, and hard work. We are dedicated to providing our clients with the best possible solutions for their needs.",
      },
      {
        tag: "p",
        content:
          "Transparency forms the foundation of our client relationships. We maintain open communication throughout the development process, ensuring clarity and alignment at every step.",
      },
      {
        tag: "p",
        content:
          "We embrace collaboration and believe that the best results come from diverse perspectives working together. Quality is non-negotiable - we thoroughly test and refine our work to meet the highest standards.",
      },
    ],
    code: `<button variant="md">Click me!</button>`,
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

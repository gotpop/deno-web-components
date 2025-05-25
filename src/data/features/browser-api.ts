import { Feature } from "./data-types.ts"

export const browserApiFeaturesMap = new Map()

browserApiFeaturesMap.set("custom-elements", {
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

browserApiFeaturesMap.set("popover api", {
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

browserApiFeaturesMap.set("css-view-transitions-2", {
  description: [
    "View transitions enable seamless animations between different states of a web application.",
  ],
  bodyMarkupData: [
    {
      tag: "h2",
      content: "View Transitions",
      id: "view-transitions",
    },
    {
      tag: "p",
      content:
        "View transitions enable seamless animations between different states of a web application. They enhance user experience by providing visual continuity during navigation or state changes.",
    },
    {
      tag: "codeblock",
      language: "html",
      code: `<div class="page" id="page1">Page 1</div>
<div class="page" id="page2" hidden>Page 2</div>
<button onclick="navigateToPage2()">Go to Page 2</button>`,
    },
    {
      tag: "p",
      content:
        "The example above demonstrates a basic setup for view transitions. The JavaScript function below handles the transition between pages:",
    },
    {
      tag: "codeblock",
      language: "javascript",
      code: `function navigateToPage2() {
  document.startViewTransition(() => {
    document.getElementById('page1').hidden = true;
    document.getElementById('page2').hidden = false;
  });
}`,
    },
    {
      tag: "p",
      content:
        "CSS can be used to define the animation styles for the transition. For example:",
    },
    {
      tag: "codeblock",
      language: "css",
      code: `@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.page {
  animation: fade 0.5s ease-in-out;
}`,
    },
    {
      tag: "p",
      content:
        "By combining HTML, JavaScript, and CSS, developers can create smooth and visually appealing transitions that improve the overall user experience.",
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

export const browserApiFeatures: Feature[] = Array.from(
  browserApiFeaturesMap.values(),
)

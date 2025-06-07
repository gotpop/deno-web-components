import type { Feature } from "../index.ts"

export const cssViewTransitions2Feature: Feature = {
  id: "css-view-transitions-2",
  blurb:
    "CSS View Transitions Level 2 expands the capabilities of smooth transitions between different DOM states, offering more control over animations.",
  description: [
    "View transitions enable seamless animations between different states of a web application.",
  ],
  bodyMarkupData: [
    {
      tag: "h2",
      content: "Getting Started",
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
  links: [
    {
      label: "W3C Specification",
      link: "https://www.w3.org/TR/css-view-transitions-2",
      type: "spec",
    },
  ],
  slug: "css-view-transitions-2",
  tags: ["browser-api"],
  title: "Document view transitions",
  type: "bapi",
}

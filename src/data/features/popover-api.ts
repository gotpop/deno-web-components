import type { Feature } from "../index.ts"

export const popoverApiFeature: Feature = {
  id: "popover-api",
  blurb:
    "The Popover API provides a built-in mechanism for displaying popover content, such as menus, tooltips, and dialogs, without complex JavaScript.",
  description: [
    "The Popover API provides a native HTML way to create and manage popover content, such as menus, custom tooltips, and dialog-like interfaces, without requiring complex JavaScript for visibility and positioning.",
  ],
  bodyMarkupData: [
    {
      tag: "h2",
      content: "Popover API",
      id: "popover-api",
    },
    {
      tag: "p",
      content:
        "The Popover API allows developers to create lightweight, context-aware UI elements that can be displayed on demand, such as tooltips, menus, or other overlays.",
    },
    {
      tag: "codeblock",
      language: "html",
      code: `<button id="infoButton">Info</button>
<div id="popoverContent" hidden>
  <p>This is a popover content example.</p>
</div>`,
    },
    {
      tag: "p",
      content:
        "The example above shows a button and a hidden popover content. The JavaScript below demonstrates how to use the Popover API to display the popover:",
    },
    {
      tag: "codeblock",
      language: "javascript",
      code: `const button = document.getElementById('infoButton');
const popover = document.getElementById('popoverContent');

button.addEventListener('click', () => {
  if (popover.hidden) {
    popover.hidden = false;
    button.setAttribute('popover', 'manual');
  } else {
    popover.hidden = true;
    button.removeAttribute('popover');
  }
});`,
    },
    {
      tag: "p",
      content:
        "CSS can be used to style the popover for better visual presentation. For example:",
    },
    {
      tag: "codeblock",
      language: "css",
      code: `#popoverContent {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}`,
    },
    {
      tag: "p",
      content:
        "By combining HTML, JavaScript, and CSS, developers can create interactive and visually appealing popovers that enhance user experience.",
    },
  ],
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
  slug: "popover-api",
  tags: ["browser-api"],
  title: "HTML Popover API",
  type: "bapi",
}

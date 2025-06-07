import type { Feature } from "../index.ts"

export const customElementsFeature: Feature = {
  id: "custom-elements",
  blurb:
    "Custom Elements allow authors to define their own HTML tags, encapsulating structure and behavior for reusable web components.",
  description: [
    "Custom Elements are a key part of the Web Components standard that allow developers to define their own HTML tags with custom templates, styles, and behaviors. This promotes reusability and modularity in web development.",
  ],
  bodyMarkupData: [
    {
      tag: "h2",
      content: "Getting Started",
      id: "html-custom-elements",
    },
    {
      tag: "p",
      content:
        "HTML Custom Elements allow developers to define their own HTML tags, enabling the creation of reusable and encapsulated components for web applications.",
    },
    {
      tag: "codeblock",
      language: "javascript",
      code: `class MyCustomElement extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = \`<style>p { color: blue; }</style><p>Hello, Custom Element!</p>\`;
  }
}

customElements.define('my-custom-element', MyCustomElement);`,
    },
    {
      tag: "p",
      content:
        "The example above demonstrates how to define a custom element named 'my-custom-element' with encapsulated styles and content.",
    },
    {
      tag: "codeblock",
      language: "html",
      code: `<my-custom-element></my-custom-element>`,
    },
    {
      tag: "p",
      content:
        "Once defined, the custom element can be used like any other HTML tag, as shown above.",
    },
    {
      tag: "p",
      content:
        "Custom elements can also respond to attributes and lifecycle events. For example:",
    },
    {
      tag: "codeblock",
      language: "javascript",
      code: `class GreetingElement extends HTMLElement {
  static get observedAttributes() {
    return ['name'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'name') {
      this.shadowRoot.querySelector('p').textContent = \`Hello, \${newValue}!\`;
    }
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = \`<p>Hello, World!</p>\`;
  }
}

customElements.define('greeting-element', GreetingElement);`,
    },
    {
      tag: "codeblock",
      language: "html",
      code: `<greeting-element name="Alice"></greeting-element>`,
    },
    {
      tag: "p",
      content:
        "In this example, the custom element updates its content dynamically based on the 'name' attribute.",
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
  slug: "custom-elements",
  tags: ["browser-api"],
  title: "Custom Elements",
  type: "bapi",
}

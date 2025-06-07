import type { Feature } from "../index.ts"

export const cssTypedOmFeature: Feature = {
  id: "css-typed-om",
  blurb:
    "The CSS Typed Object Model (OM) provides a JavaScript interface to CSS values that is more performant and easier to use than string-based manipulation.",
  description: [
    "The CSS Typed Object Model (OM) API provides a more typed and structured way to interact with CSS values in JavaScript, as opposed to the traditional string-based approach of `element.style`. It offers better performance and more robust handling of CSS properties and their values.",
  ],
  bodyMarkupData: [
    {
      tag: "h2",
      content: "Getting Started",
      id: "css-typed-om",
    },
    {
      tag: "p",
      content:
        "The CSS Typed Object Model (OM) exposes CSS values as typed JavaScript objects rather than simple strings. This allows for more robust and performant manipulation of CSS properties directly from JavaScript.",
    },
    {
      tag: "p",
      content:
        "Traditionally, when you get a CSS value via `element.style.width` or `getComputedStyle(element).width`, you get a string like '100px'. With Typed OM, you get a `CSSUnitValue` object.",
    },
    {
      tag: "codeblock",
      language: "javascript",
      code: `const element = document.getElementById('myElement');

// Traditional way (string-based)
element.style.opacity = '0.5';
const opacityString = element.style.opacity; // "0.5"
console.log(typeof opacityString); // "string"

// Using CSS Typed OM
if (element.attributeStyleMap) {
  // Set a value
  element.attributeStyleMap.set('opacity', CSS.number(0.7));
  
  // Get a value
  const opacityTyped = element.attributeStyleMap.get('opacity');
  console.log(opacityTyped.value); // 0.7
  console.log(opacityTyped.constructor.name); // CSSUnitValue or CSSNumericValue (CSSNumberValue in some impl)

  // Example with units
  element.attributeStyleMap.set('width', CSS.px(200));
  const widthTyped = element.attributeStyleMap.get('width');
  console.log(widthTyped.value); // 200
  console.log(widthTyped.unit); // "px"

  // You can also work with computed styles
  const computedOpacity = element.computedStyleMap().get('opacity');
  console.log('Computed Opacity:', computedOpacity.value);
} else {
  console.log('CSS Typed OM not supported in this browser.');
}`,
    },
    {
      tag: "p",
      content:
        "In this example, `element.attributeStyleMap` provides access to inline styles as typed objects. `CSS.number()`, `CSS.px()`, `CSS.percent()`, etc., are factory functions to create these typed values.",
    },
    {
      tag: "p",
      content: "Benefits of Typed OM include:",
    },
    {
      tag: "ul",
      items: [
        "<strong>Performance:</strong> Reduces string parsing overhead as values are already numbers.",
        "<strong>Correctness:</strong> Less error-prone as you work with specific units and types.",
        "<strong>Arithmetic:</strong> `CSSNumericValue` objects support arithmetic operations (e.g., `CSS.px(10).add(CSS.percent(50))`).",
      ],
    },
    {
      tag: "p",
      content:
        "The Typed OM is a powerful addition for developers who need to manipulate CSS values dynamically and efficiently in JavaScript.",
    },
  ],
  links: [
    {
      label: "MDN Documentation",
      link: "https://developer.mozilla.org/en-US/docs/Web/API/CSS_Typed_OM_API",
      type: "docs",
    },
    {
      label: "W3C Specification",
      link: "https://drafts.css-houdini.org/css-typed-om/",
      type: "spec",
    },
  ],
  slug: "css-typed-om",
  tags: ["cssom"],
  title: "CSS Typed Object Model",
  type: "cssom",
}

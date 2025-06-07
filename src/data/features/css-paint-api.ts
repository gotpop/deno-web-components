import type { Feature } from "../index.ts"

export const cssPaintApiFeature: Feature = {
  id: "css-paint-api",
  blurb:
    "The CSS Paint API allows developers to generate an image in JavaScript that can be drawn directly to an element, similar to a CSS gradient or image.",
  description: [
    "The CSS Paint API, part of the Houdini project, allows developers to create custom CSS paint functions. These functions are JavaScript worklets that can generate an image for a CSS properties, like `background-image`.",
  ],
  bodyMarkupData: [
    {
      tag: "h2",
      content: "Getting Started",
      id: "css-paint-api",
    },
    {
      tag: "p",
      content:
        "The CSS Paint API, part of the CSS Houdini umbrella of APIs, allows developers to create custom CSS image values by using a JavaScript function (a paint worklet) to draw directly into an element's background, border, or mask.",
    },
    {
      tag: "p",
      content:
        "First, you need to define a paint worklet. Create a JavaScript file (e.g., 'checkerboard.js'):",
    },
    {
      tag: "codeblock",
      language: "javascript",
      code: `// checkerboard.js
registerPaint('checkerboard', class {
  static get inputProperties() { return ['--checkerboard-color', '--checkerboard-size']; }

  paint(ctx, geom, properties) {
    const color = properties.get('--checkerboard-color').toString() || 'black';
    const size = parseInt(properties.get('--checkerboard-size').toString()) || 10;
    
    for (let y = 0; y < geom.height / size; y++) {
      for (let x = 0; x < geom.width / size; x++) {
        if ((x + y) % 2 === 0) {
          ctx.beginPath();
          ctx.fillStyle = color;
          ctx.rect(x * size, y * size, size, size);
          ctx.fill();
        }
      }
    }
  }
});`,
    },
    {
      tag: "p",
      content:
        "This worklet defines a 'checkerboard' paint function that draws a checkerboard pattern. It can take custom properties '--checkerboard-color' and '--checkerboard-size' as input.",
    },
    {
      tag: "p",
      content:
        "Next, register this worklet in your main JavaScript or HTML file:",
    },
    {
      tag: "codeblock",
      language: "javascript",
      code: `if ('paintWorklet' in CSS) {
  CSS.paintWorklet.addModule('checkerboard.js');
} else {
  console.log('CSS Paint API not supported.');
}`,
    },
    {
      tag: "p",
      content: "Finally, use your custom paint function in CSS:",
    },
    {
      tag: "codeblock",
      language: "css",
      code: `.my-element {
  --checkerboard-color: blue;
  --checkerboard-size: 20px;
  background-image: paint(checkerboard);
  width: 200px;
  height: 200px;
  border: 1px solid black;
}`,
    },
    {
      tag: "p",
      content:
        "This CSS applies the 'checkerboard' paint to the background of '.my-element', using the specified color and size. This allows for dynamic and resolution-independent graphics directly within CSS.",
    },
  ],
  links: [
    {
      label: "W3C Specification",
      link: "https://drafts.css-houdini.org/css-paint-api/",
      type: "spec",
    },
    {
      label: "MDN Documentation",
      link: "https://developer.mozilla.org/en-US/docs/Web/API/CSS_Painting_API",
      type: "docs",
    },
  ],
  slug: "css-paint-api",
  tags: ["cssom"],
  title: "CSS Paint API",
  type: "cssom",
}

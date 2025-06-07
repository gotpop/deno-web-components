import type { Feature } from "../index.ts"

export const cssAnchorPositionFeature: Feature = {
  id: "css-anchor-position-1",
  blurb:
    "CSS Anchor Positioning allows elements to be tethered to other elements, with dynamic adjustments based on proximity & overflow.",
  description: [
    "Anchor positioning is a powerful tool for creating dynamic & reusable styles.",
    "They allow you to define styles based on the context in which they are used, making it easier to create responsive & flexible designs.",
  ],
  bodyMarkupData: [
    {
      tag: "h2",
      content: "Getting Started",
      id: "css-anchor-positioning",
    },
    {
      tag: "p",
      content:
        "CSS Anchor Positioning allows an element (the 'positioned element') to be positioned relative to one or more other elements (the 'anchor elements') on the page, regardless of their DOM relationship. This is particularly useful for creating tooltips, popovers, and other UI elements that need to be tethered to a trigger.",
    },
    {
      tag: "p",
      content: "Here's a basic example of how you might set up a tooltip:",
    },
    {
      tag: "codeblock",
      language: "html",
      code: `<button id="myAnchorButton">Hover me</button>
<div class="tooltip">This is a tooltip!</div>

<style>
  #myAnchorButton {
    anchor-name: --my-anchor;
  }

  .tooltip {
    /* Position the tooltip using the anchor */
    position: absolute;
    left: anchor(--my-anchor left);
    top: anchor(--my-anchor bottom);
    
    /* Fallback positioning for browsers that don't support anchor() */
    /* (This might need JavaScript or different CSS for a robust fallback) */
    margin-top: 5px; 

    /* Basic styling */
    background-color: #333;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    display: none; /* Initially hidden */
  }

  #myAnchorButton:hover + .tooltip,
  #myAnchorButton:focus + .tooltip { /* Show on hover/focus for demo */
    display: block;
  }
</style>`,
    },
    {
      tag: "p",
      content:
        'In this example, the `button` with `id="myAnchorButton"` is designated as an anchor using the `anchor-name: --my-anchor;` CSS property. The `div` with class `tooltip` then uses `anchor(--my-anchor left)` and `anchor(--my-anchor bottom)` to position itself relative to this anchor.',
    },
    {
      tag: "p",
      content:
        "The `anchor()` function can take various arguments to specify which edge or point of the anchor element to use, and you can combine it with `calc()` for more complex positioning. This feature greatly simplifies the creation of UIs that require elements to be dynamically positioned relative to others.",
    },
  ],
  links: [
    {
      label: "CSS Working Group Draft",
      link: "https://drafts.csswg.org/css-anchor-position-1",
      type: "spec",
    },
    {
      label: "MDN Documentation",
      link:
        "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning",
      type: "docs",
    },
  ],
  slug: "css-anchor-position-1",
  tags: ["css"],
  title: "CSS Anchor positioning",
  type: "css",
}

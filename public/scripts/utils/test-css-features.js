export const testCssFeatures = () => {
  const features = {
    container: {
      supported: CSS.supports("container-type: inline-size"),
      title: "CSS Container Queries",
      description:
        "Container queries allow you to apply styles based on the size of a parent element.",
      mdn: "https://developer.mozilla.org/en-US/docs/Web/CSS/@container",
    },
    grid: {
      supported: CSS.supports("display: grid"),
      title: "CSS Grid Layout",
      description:
        "Grid layout allows you to create complex layouts with rows and columns.",
      mdn: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout",
    },
    clamp: {
      supported: CSS.supports("width: clamp(1rem, 50%, 10rem)"),
      title: "CSS Clamp",
      description:
        "Clamp allows you to set a value that falls within a specific range.",
      mdn: "https://developer.mozilla.org/en-US/docs/Web/CSS/clamp",
    },
    viewTransitions: {
      supported: CSS.supports("view-transition-name: any-name"),
      title: "CSS View Transitions",
      description: "View transitions allow you to animate changes in layout.",
      mdn: "https://developer.mozilla.org/en-US/docs/Web/CSS/@view",
    },
  }

  return features
}

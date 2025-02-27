export const itemStyle = `
      :host {
        display: block;
        background-color: oklch(from var(--colour-dark) l c h);
        color: var(--colour-light);
        padding: var(--padding, 1rem);
        grid-column: span attr(data-columns type(<integer>));
        grid-row: span attr(data-rows type(<integer>));
      }
    `

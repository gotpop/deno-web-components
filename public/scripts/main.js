import { AppShell } from "./components/app-shell/app-shell.js";
import { Footer } from "./components/footer/footer.js";
import { GridItem } from "./components/item/item.js";
import { Header } from "./components/header/header.js";
import { Hero } from "./components/hero/hero.js";
import { Main } from "./components/main/main.js";
import { NavItem } from "./components/nav-item/nav-item.js";

const components = [
  ["app-shell", AppShell],
  ["site-header", Header],
  ["site-hero", Hero],
  ["main-component", Main],
  ["site-footer", Footer],
  ["nav-item", NavItem],
  ["grid-item", GridItem],
];

// Register all components
for (const [name, constructor] of components) {
  if (!customElements.get(name)) {
    customElements.define(name, constructor);
  }
}

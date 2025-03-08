import { componentCss } from "./filters/component-css.ts";
import { configure } from "https://esm.sh/nunjucks@3.2.4";
import { importCss } from "./filters/import-css.ts";
import { isActive } from "./filters/is-active.ts";

const TEMPLATES_DIR = "./src/templates";

export const templateConfig = {
  componentPath: "/src/templates/components",
};

export function setupNunjucks() {
  // Configure Nunjucks
  const nunjucks = configure(TEMPLATES_DIR, {
    autoescape: true,
    noCache: true, // Disable cache for development
  });

  // Add filters
  nunjucks.addFilter("importCss", importCss);
  nunjucks.addFilter("componentCss", componentCss);
  nunjucks.addFilter("isActive", isActive);

  return nunjucks;
}

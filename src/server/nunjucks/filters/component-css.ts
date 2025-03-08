import { join } from "https://deno.land/std@0.224.0/path/mod.ts";

const templateConfig = {
  componentPath: "/src/templates/components",
};

export function componentCss(componentName: string) {
  const path = join(
    templateConfig.componentPath,
    componentName,
    `${componentName}.css`
  );
  console.log(`Resolved component CSS path: ${path}`);
  return path;
}

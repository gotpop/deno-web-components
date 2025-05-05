import { gray, green } from "https://deno.land/std@0.220.1/fmt/colors.ts"

import { join } from "https://deno.land/std@0.224.0/path/mod.ts"

const templateConfig = {
  componentPath: "/src/templates/partials",
}

export function componentCss(componentName: string) {
  const path = join(
    templateConfig.componentPath,
    componentName,
    `${componentName}.css`,
  )

  // console.log(green(`Resolved component CSS path: \n`), gray(path));

  return path
}

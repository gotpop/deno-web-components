import { join } from "https://deno.land/std@0.224.0/path/mod.ts"

export function importCss(cssFilePath: string) {
  try {
    const fullPath = join(Deno.cwd(), cssFilePath)
    const css = Deno.readTextFileSync(fullPath)

    return css
  } catch (error) {
    console.error(`Error importing CSS file ${cssFilePath}:`, error)
    return "/* CSS import failed */"
  }
}

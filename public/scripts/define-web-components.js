import { log } from "./console-log.js"

export const initWebComponents = () => {
  const components = [

  ]

  const definitions = components.map(([name, constructor]) => {
    if (!customElements.get(name)) {
      customElements.define(name, constructor)

      return customElements.whenDefined(name)
    }

    return Promise.resolve()
  })

  Promise.all([
    ...definitions,
  ]).then(() => {
    const componentInfo = components.map(([name, constructor]) => ({
      name,
      constructor: constructor.name,
      defined: customElements.get(name) ? "Yes" : "No",
    }))
    log.success("All components are ready")
  })
}

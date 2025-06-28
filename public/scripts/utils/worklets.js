export async function initWorklets() {
  const worklets = ["grid"].map(
    (name) => `/scripts/worklets/worklet.${name}.js`,
  )

  worklets.forEach(async (worklet) => {
    try {
      if (!CSS?.paintWorklet) {
        throw new Error("CSS Paint Worklet API is not supported")
      }
      await CSS.paintWorklet.addModule(worklet)
      console.log(`Worklet loaded successfully: ${worklet}`)
    } catch (error) {
      console.error(`Failed to load worklet ${worklet}:`, error)
    }
  })
}

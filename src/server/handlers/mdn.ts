interface W3CSpec {
  title: string
  shortname: string
  description: string
  latest_version: string
}

export async function getCssSpecification(
  feature: string,
): Promise<W3CSpec | null> {
  try {
    const response = await fetch(
      `https://api.w3.org/specifications/${feature}`,
    )
    if (!response.ok) return null
    return await response.json()
  } catch (error) {
    console.error("Error fetching W3C spec:", error)
    return null
  }
}

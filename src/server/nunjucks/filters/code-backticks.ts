/**
 * Filter that parses text for backticks and wraps the content in <code> tags
 * Handles both single backticks for inline code and preserves other content
 * Also handles escaped backticks and prevents nested code tags
 */
export function codeBackticks(text: string): string {
  if (!text || typeof text !== "string") {
    return text
  }

  // First, handle escaped backticks by temporarily replacing them
  const escapedBacktickPlaceholder = "___ESCAPED_BACKTICK___"
  let processedText = text.replace(/\\`/g, escapedBacktickPlaceholder)

  // Replace single backticks with <code> tags
  // This regex matches content between single backticks that doesn't contain backticks
  processedText = processedText.replace(/`([^`]+)`/g, "<code>$1</code>")

  // Restore escaped backticks
  processedText = processedText.replace(
    new RegExp(escapedBacktickPlaceholder, "g"),
    "`",
  )

  return processedText
}

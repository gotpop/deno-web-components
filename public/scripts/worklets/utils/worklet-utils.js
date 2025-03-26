/**
 * Utility functions for CSS Paint API worklets
 *
 * HOW TO USE THESE FUNCTIONS IN YOUR WORKLET:
 *
 * 1. Copy the functions you need into your worklet file
 * 2. Add them as methods to your worklet class or use them directly
 *
 * These functions are kept here as a reference library to maintain consistency
 * across worklets, but they need to be directly included in each worklet file
 * since worklets run in their own context.
 */

// Convert RGB to RGBA
export function rgbToRgba(rgb, alpha) {
  const rgbValues = rgb.match(/\d+/g)
  if (rgbValues === null || rgbValues.length !== 3) {
    throw new Error("Invalid RGB color format")
  }
  const [r, g, b] = rgbValues.map(Number)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

// Adjust color brightness
export function adjustColorBrightness(rgb, factor) {
  const rgbValues = rgb.match(/\d+/g)
  if (rgbValues === null || rgbValues.length !== 3) {
    throw new Error("Invalid RGB color format")
  }
  let [r, g, b] = rgbValues.map(Number)
  r = Math.max(0, Math.min(255, Math.round(r * factor)))
  g = Math.max(0, Math.min(255, Math.round(g * factor)))
  b = Math.max(0, Math.min(255, Math.round(b * factor)))
  return `rgb(${r}, ${g}, ${b})`
}

// Draw grid pattern function
export function drawGrid(ctx, geom, gridSize, baseColor, evenOdd = "even") {
  // Calculate horizontal offset for vertical lines
  let offset = (geom.width % gridSize) / 2

  // Calculate the number of vertical lines
  let numLinesX = Math.floor((geom.width - 2 * offset) / gridSize) + 1

  // Determine desired parity (0 for even, 1 for odd)
  const desiredParity = evenOdd === "odd" ? 1 : 0

  // Adjust offset if numLinesX parity doesn't match desiredParity
  if (numLinesX % 2 !== desiredParity) {
    offset -= gridSize / 2
    numLinesX = Math.floor((geom.width - 2 * offset) / gridSize) + 1
  }

  // Draw vertical grid lines
  for (let x = offset; x <= geom.width; x += gridSize) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, geom.height)
    ctx.strokeStyle = baseColor
    ctx.stroke()
  }

  // Draw horizontal grid lines
  for (let y = 0; y <= geom.height; y += gridSize) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(geom.width, y)
    ctx.strokeStyle = baseColor
    ctx.stroke()
  }
}

// Add more utility functions below as needed...

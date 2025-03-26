if (typeof registerPaint !== "undefined") {
  class SquarePainter {
    static get inputProperties() {
      return [
        "--root-grid-size",
        "--grid-gap",
        "--grid-base-color",
        "--animation-progress",
        "--stagger-delay",
        "--even-odd",
      ]
    }

    paint(ctx, geom, properties) {
      const baseColor = properties.get("--grid-base-color").toString().trim() ||
        "rgba(115, 92, 221, 0.4)"

      const gridSize =
        parseInt(properties.get("--root-grid-size").toString()) || 16

      const gridGap = parseInt(properties.get("--grid-gap").toString()) || 0

      const evenOdd = properties.get("--even-odd").toString().trim() || "even"

      // Draw both the grid lines and squares at intersections
      this.drawGrid(ctx, geom, gridSize, baseColor, evenOdd)
      this.drawGridSquares(ctx, geom, gridSize, baseColor, evenOdd, gridGap)
    }

    // Utility functions directly included in the worklet
    // These are copied from worklet-utils.js

    rgbToRgba(rgb, alpha) {
      const rgbValues = rgb.match(/\d+/g)
      if (rgbValues === null || rgbValues.length !== 3) {
        throw new Error("Invalid RGB color format")
      }
      const [r, g, b] = rgbValues.map(Number)
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }

    adjustColorBrightness(rgb, factor) {
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

    drawGrid(ctx, geom, gridSize, baseColor, evenOdd = "even") {
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

    drawGridSquares(
      ctx,
      geom,
      gridSize,
      baseColor,
      evenOdd = "even",
      gridGap = 0,
    ) {
      // Calculate horizontal offset for grid - same as in drawGrid to maintain alignment
      let offset = (geom.width % gridSize) / 2

      // Calculate the number of vertical lines - same as in drawGrid
      let numLinesX = Math.floor((geom.width - 2 * offset) / gridSize) + 1

      // Determine desired parity (0 for even, 1 for odd) - same as in drawGrid
      const desiredParity = evenOdd === "odd" ? 1 : 0

      // Adjust offset if numLinesX parity doesn't match desiredParity - same as in drawGrid
      if (numLinesX % 2 !== desiredParity) {
        offset -= gridSize / 2
        numLinesX = Math.floor((geom.width - 2 * offset) / gridSize) + 1
      }

      // Size of squares to draw at intersections
      const squareSize = Math.max(2, gridSize / 3) // Adjust size as needed

      // Draw squares at grid intersections
      for (let y = 0; y <= geom.height; y += gridSize) {
        for (let x = offset; x <= geom.width; x += gridSize) {
          // Calculate the center position for the square
          const centerX = x
          const centerY = y

          // Draw square centered at grid intersection
          ctx.fillStyle = baseColor
          ctx.fillRect(
            centerX - squareSize / 2,
            centerY - squareSize / 2,
            squareSize,
            squareSize,
          )
        }
      }
    }
  }

  registerPaint("squares", SquarePainter)
}

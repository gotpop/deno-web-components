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

    generateRandomColor(baseColor) {
      const rgbValues = baseColor.match(/\d+/g)
      if (!rgbValues || rgbValues.length < 3) return baseColor

      const [r, g, b] = rgbValues.map(Number)
      const variance = 50 // Color variance amount

      const newR = Math.max(
        0,
        Math.min(255, r + (Math.random() * variance * 2 - variance)),
      )
      const newG = Math.max(
        0,
        Math.min(255, g + (Math.random() * variance * 2 - variance)),
      )
      const newB = Math.max(
        0,
        Math.min(255, b + (Math.random() * variance * 2 - variance)),
      )

      // Get alpha value if present in baseColor
      let alpha = 1
      if (baseColor.includes("rgba")) {
        const alphaMatch = baseColor.match(/[\d.]+\)/)
        if (alphaMatch) alpha = parseFloat(alphaMatch[0])
      }

      return `rgba(${Math.round(newR)}, ${Math.round(newG)}, ${
        Math.round(newB)
      }, ${alpha})`
    }

    getPositionBasedColor(baseColor, x, y, gridSize, geomWidth, geomHeight) {
      const rgbValues = baseColor.match(/\d+/g)
      if (!rgbValues || rgbValues.length < 3) return baseColor

      const [r, g, b] = rgbValues.map(Number)
      const variance = 150 // Higher variance for more dramatic color differences

      // Get alpha value if present in baseColor
      let alpha = 1
      if (baseColor.includes("rgba")) {
        const alphaMatch = baseColor.match(/[\d.]+\)/)
        if (alphaMatch) alpha = parseFloat(alphaMatch[0])
      }

      // Calculate normalized horizontal and vertical positions (0 to 1)
      const normalizedX = x / geomWidth
      const normalizedY = y / geomHeight

      // Create separate fade factors for horizontal and vertical directions
      // Lower values = more opaque, higher values = more transparent
      const horizontalFade = normalizedX * 1.2 // Fade as we move right
      const verticalFade = normalizedY * 1.2 // Fade as we move down

      // Combine the fade factors to create the final opacity
      // We use the maximum of both fades to ensure that moving either right or down
      // will cause transparency to increase
      const combinedFade = Math.max(horizontalFade, verticalFade)

      // Calculate the new alpha value, ensure it's between 0 and the original alpha
      const newAlpha = Math.max(0, Math.min(alpha, 1 - combinedFade))

      // If the square would be completely transparent, skip further calculations
      if (newAlpha <= 0) {
        return "rgba(0, 0, 0, 0)"
      }

      // Create quantized row and column indices for pixelated effect
      const rowIndex = Math.floor(y / gridSize)
      const colIndex = Math.floor(x / gridSize)

      // Use prime numbers for increased variation
      const rowFactor = (rowIndex * 17) % 13
      const colFactor = (colIndex * 23) % 11

      // Create distinctive color bands for a pixelated appearance
      const rBand = (rowIndex % 3) * (colIndex % 4) * variance / 6
      const gBand = (rowIndex % 4) * (colIndex % 5) * variance / 8
      const bBand = (rowIndex % 5) * (colIndex % 3) * variance / 7

      // Combine bands for color offsets
      const rOffset = rBand + (rowFactor * colFactor * 5)
      const gOffset = gBand + (rowFactor * 7)
      const bOffset = bBand + (colFactor * 9)

      // Quantize the output colors for pixelated appearance
      const colorQuantum = 25

      // Apply color variations with bounds checking and quantization
      const newR =
        Math.floor((Math.max(0, Math.min(255, r + rOffset))) / colorQuantum) *
        colorQuantum
      const newG =
        Math.floor((Math.max(0, Math.min(255, g + gOffset))) / colorQuantum) *
        colorQuantum
      const newB =
        Math.floor((Math.max(0, Math.min(255, b + bOffset))) / colorQuantum) *
        colorQuantum

      return `rgba(${newR}, ${newG}, ${newB}, ${newAlpha})`
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

      // Size of squares to draw inside grid cells (accounting for gap)
      const effectiveSize = gridSize - (2 * gridGap)
      const squareSize = Math.max(2, effectiveSize)

      // Draw squares inside grid cells (not at intersections)
      for (let y = 0; y < geom.height; y += gridSize) {
        for (let x = offset; x < geom.width; x += gridSize) {
          // Calculate the top-left position for the square with gap
          const squareX = x + gridGap
          const squareY = y + gridGap

          // Generate deterministic color based on position, passing both width and height
          ctx.fillStyle = this.getPositionBasedColor(
            baseColor,
            x,
            y,
            gridSize,
            geom.width,
            geom.height,
          )

          // Draw square inside the cell
          ctx.fillRect(
            squareX,
            squareY,
            squareSize,
            squareSize,
          )
        }
      }
    }
  }

  registerPaint("squares2", SquarePainter)
}

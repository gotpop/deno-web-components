if (typeof registerPaint !== "undefined") {
  class GridPainter {
    static get inputProperties() {
      return [
        "--root-grid-size",
        "--grid-gap",
        "--grid-base-color",
        "--grid-vertical-color",
        "--grid-horizontal-color",
        "--animation-progress",
        "--stagger-delay",
        "--even-odd",
        "--grid-offset",
      ]
    }

    getPropertyValue(properties, name, defaultValue = null) {
      const prop = properties.get(name)
      if (prop) {
        const value = prop.toString().trim()
        if (value) {
          return value
        }
      }
      
      return defaultValue
    }
    
    paint(ctx, geom, properties) {
      const base = "rgba(115, 92, 221, 0.4)"
      const baseColor = this.getPropertyValue(
        properties,
        "--grid-base-color",
        base,
      )
      const verticalColor = this.getPropertyValue(
        properties,
        "--grid-vertical-color",
        baseColor,
      )
      const horizontalColor = this.getPropertyValue(
        properties,
        "--grid-horizontal-color",
        baseColor,
      )

      const gridSize = parseInt(
        this.getPropertyValue(properties, "--root-grid-size", "16"),
      )

      const evenOdd = this.getPropertyValue(properties, "--even-odd", "even")
      const gridOffset = this.getPropertyValue(properties, "--grid-offset")

      this.drawGrid(
        ctx,
        geom,
        gridSize,
        verticalColor,
        horizontalColor,
        evenOdd,
        gridOffset,
      )
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

    drawGrid(
      ctx,
      geom,
      gridSize,
      verticalColor,
      horizontalColor,
      evenOdd = "even",
      gridOffset = null,
    ) {
      // Default to left-aligned (offset = 0)
      let offset = 0

      // If gridOffset is 'centre', calculate centered offset
      if (gridOffset === "centre") {
        // Calculate horizontal offset for vertical lines (centered)
        offset = (geom.width % gridSize) / 2

        // Calculate the number of vertical lines
        let numLinesX = Math.floor((geom.width - 2 * offset) / gridSize) + 1

        // Determine desired parity (0 for even, 1 for odd)
        const desiredParity = evenOdd === "odd" ? 1 : 0

        // Adjust offset if numLinesX parity doesn't match desiredParity
        if (numLinesX % 2 !== desiredParity) {
          offset -= gridSize / 2
          numLinesX = Math.floor((geom.width - 2 * offset) / gridSize) + 1
        }
      }

      // Draw vertical grid lines
      for (let x = offset; x <= geom.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, geom.height)
        ctx.strokeStyle = verticalColor
        ctx.stroke()
      }

      // Draw horizontal grid lines
      for (let y = 0; y <= geom.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(geom.width, y)
        ctx.strokeStyle = horizontalColor
        ctx.stroke()
      }
    }
  }

  registerPaint("grid", GridPainter)
}

registerPaint(
  "diagonalCrosshatch",
  class {
    static get inputProperties() {
      return [
        "--hatch-color",
        "--hatch-gap",
        "--gradient-start",
        "--gradient-end",
      ]
    }
    paint(ctx, size, properties) {
      // Get custom property values or defaults
      const gradStart = properties.get("--gradient-start").toString().trim() ||
        "lightblue"
      const gradEnd = properties.get("--gradient-end").toString().trim() ||
        "blue"
      const hatchColor = properties.get("--hatch-color").toString().trim() ||
        "rgba(0,0,0,0.2)"
      const gap = parseInt(properties.get("--hatch-gap").toString()) || 10

      // Fill background with a diagonal gradient
      const gradient = ctx.createLinearGradient(0, 0, size.width, size.height)
      gradient.addColorStop(0, gradStart)
      gradient.addColorStop(1, gradEnd)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, size.width, size.height)

      // Draw diagonal crosshatch lines
      ctx.strokeStyle = hatchColor
      ctx.lineWidth = 1
      for (let i = -size.height; i < size.width; i += gap) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i + size.height, size.height)
        ctx.stroke()
      }
    }
  },
)

if (typeof registerPaint !== "undefined") {
  class SquarePainter {
    static get inputProperties() {
      return [
        "--square-color",
        "--square-position-x",
        "--square-position-y",
      ]
    }

    paint(ctx, geom, properties) {
      // Get the base color or use a default
      const baseColor = properties.get("--square-color").toString().trim() ||
        "rgba(115, 92, 221, 0.4)"

      // Get position properties or default to top left (0,0)
      const posX = parseInt(properties.get("--square-position-x").toString()) ||
        0
      const posY = parseInt(properties.get("--square-position-y").toString()) ||
        0

      // Fixed square size
      const squareSize = 32

      // Draw a single 32x32 square
      ctx.fillStyle = baseColor
      ctx.fillRect(posX, posY, squareSize, squareSize)
    }
  }

  registerPaint("squares3", SquarePainter)
}

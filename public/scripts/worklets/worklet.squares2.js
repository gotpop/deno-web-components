if (typeof registerPaint !== "undefined") {
  class SquarePainter {
    static get inputProperties() {
      return [
        "--square-position-x",
        "--square-position-y",
      ]
    }

    static get inputArguments() {
      return [
        "<length>", // blockSize
        "<color>", // color
        "<number>", // shape index (0-6)
        "<number>", // rotation (0-3)
      ]
    }

    paint(ctx, geom, properties, args) {
      // Get position properties or default to top left (0,0)
      const posX = parseInt(properties.get("--square-position-x").toString()) ||
        0
      const posY = parseInt(properties.get("--square-position-y").toString()) ||
        0

      // Extract arguments with defaults
      const blockSize = args && args[0] ? args[0].toString().trim() : "32px"
      const color = args && args[1]
        ? args[1].toString().trim()
        : "rgba(0, 240, 240, 0.6)"
      const shapeIndex = args && args[2]
        ? Math.min(Math.max(0, parseInt(args[2])), 6)
        : 0
      const rotation = args && args[3]
        ? Math.min(Math.max(0, parseInt(args[3])), 3)
        : 0

      // Parse blockSize to remove 'px' and convert to number
      const blockSizeValue = parseInt(blockSize) || 32

      // Define Tetris shapes as relative coordinates
      const tetrisShapes = [
        // I shape
        {
          blocks: [[0, 0], [1, 0], [2, 0], [3, 0]],
        },
        // O shape
        {
          blocks: [[0, 0], [1, 0], [0, 1], [1, 1]],
        },
        // T shape
        {
          blocks: [[0, 0], [1, 0], [2, 0], [1, 1]],
        },
        // L shape
        {
          blocks: [[0, 0], [0, 1], [0, 2], [1, 2]],
        },
        // J shape
        {
          blocks: [[1, 0], [1, 1], [1, 2], [0, 2]],
        },
        // S shape
        {
          blocks: [[1, 0], [2, 0], [0, 1], [1, 1]],
        },
        // Z shape
        {
          blocks: [[0, 0], [1, 0], [1, 1], [2, 1]],
        },
      ]

      // Function to apply rotation to blocks
      function rotateBlock(x, y, rotation) {
        switch (rotation) {
          case 0: // 0 degrees
            return [x, y]
          case 1: // 90 degrees
            return [y, -x]
          case 2: // 180 degrees
            return [-x, -y]
          case 3: // 270 degrees
            return [-y, x]
          default:
            return [x, y]
        }
      }

      // Draw the single Tetris shape
      const shape = tetrisShapes[shapeIndex]
      ctx.fillStyle = color

      // Get max dimensions of the shape to calculate offset for rotation
      let maxX = 0, maxY = 0
      for (const [x, y] of shape.blocks) {
        maxX = Math.max(maxX, x)
        maxY = Math.max(maxY, y)
      }

      // Draw each block in the shape
      for (const [blockX, blockY] of shape.blocks) {
        // Apply rotation
        let [rotX, rotY] = rotateBlock(blockX, blockY, rotation)

        // Apply offset based on rotation to keep piece centered
        if (rotation === 1) { // 90 degrees
          rotX += maxY
        } else if (rotation === 2) { // 180 degrees
          rotX += maxX
          rotY += maxY
        } else if (rotation === 3) { // 270 degrees
          rotY += maxX
        }

        ctx.fillRect(
          posX + rotX * blockSizeValue,
          posY + rotY * blockSizeValue,
          blockSizeValue,
          blockSizeValue,
        )
      }
    }
  }

  registerPaint("squares2", SquarePainter)
}

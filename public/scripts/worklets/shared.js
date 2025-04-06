export const tetrisLayout = [
  // I-shape horizontal
  { shape: 0, x: 0, y: 4, rotation: 0 },
  // O-shape (rotation doesn't matter for this shape)
  { shape: 1, x: 4, y: 3, rotation: 0 },
  { shape: 1, x: 9, y: 1, rotation: 0 },
  // T-shape with 90° rotation
  { shape: 2, x: 2, y: -2, rotation: 3 },
  // L-shape with 180° rotation
  { shape: 3, x: 7, y: 4, rotation: 1 },
  // J-shape with 270° rotation
  { shape: 4, x: 8, y: 2, rotation: 3 },
  // S-shape
  { shape: 5, x: 2, y: 2, rotation: 0 },
  { shape: 5, x: 7, y: 0, rotation: 0 },
  // Z-shape with 90° rotation
  { shape: 6, x: 11, y: 2, rotation: 0 },
  // I-shape vertical
  { shape: 0, x: 12, y: 4, rotation: 0 },
]

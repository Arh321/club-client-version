export function hexToOpacity(hex, opacity = 0.5) {
  // Validate the input hex color
  if (!/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(hex)) {
    throw new Error("Invalid hex color format. Use #RGB or #RRGGBB format.");
  }

  // Expand shorthand hex (#RGB) to full form (#RRGGBB)
  if (hex.length === 4) {
    hex = `#${[...hex.slice(1)].map((ch) => ch + ch).join("")}`;
  }

  // Extract RGB components
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // Convert to RGBA with the specified opacity
  const a = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");

  // Return the 8-character hex color
  return `#${hex.slice(1)}${a}`;
}

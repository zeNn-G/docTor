export function normalizeColor(color: string | undefined) {
  if (!color) return color;
  color = (color.charCodeAt(0) === 35 ? color.slice(1) : color).toLowerCase();
  if (color.length === 3 || color.length === 4)
    color = color
      .split("")
      .map((c) => c + c)
      .join("");
  return color;
}

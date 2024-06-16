export function generateFixedColors(item: string): string {
  const item1 = item.trim();
  let hash = 0;
  for (let i = 0; i < item1.length; i++) {
    hash = item1.charCodeAt(i) + ((hash << 5) - hash);
  }

  const color = "#" + ((hash & 0xffffff) | 0x1000000).toString(16).slice(1);

  return color;
}

export function makeColorsBrighter(color: string): string {
  const [r, g, b] = color
    .slice(1)
    .match(/.{2}/g)!
    .map((hex) => parseInt(hex, 16));

  const newColor = `rgba(${r},${g},${b}, 0.4)`;

  return newColor;
}

export function makeTextDarker(color: string): string {
  const [r, g, b] = color
    .slice(1)
    .match(/.{2}/g)!
    .map((hex) => parseInt(hex, 16));

  const newColor = `rgb(${r},${g},${b})`;

  return newColor;
}

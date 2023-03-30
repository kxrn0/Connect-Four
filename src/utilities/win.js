function horizontal(c, g, w, l, e) {
  if (c.x + l > w) return null;

  const cells = [];
  const value = g[c.x + c.y * w];

  if (value === e) return null;

  for (let x = c.x; x < c.x + l; x++)
    if (value !== g[x + c.y * w]) return null;
    else cells.push({ x, y: c.y });
  return cells;
}

function vertical(c, g, w, h, l, e) {
  if (c.y + l > h) return null;

  const cells = [];
  const value = g[c.x + c.y * w];

  if (value === e) return null;

  for (let y = c.y; y < c.y + l; y++)
    if (value !== g[c.x + y * w]) return null;
    else cells.push({ x: c.x, y });
  return cells;
}

function diagonal_right(c, g, w, h, l, e) {
  if (c.x + l > w || c.y + l > h) return null;

  const cells = [];
  const value = g[c.x + c.y * w];

  if (value === e) return null;

  for (let x = c.x, y = c.y; x < c.x + l && y < c.y + l; x++, y++)
    if (value !== g[x + y * w]) return null;
    else cells.push({ x, y });
  return cells;
}

function diagonal_left(c, g, w, h, l, e) {
  if (c.x + 1 - l < 0 || c.y + l > h) return null;

  const cells = [];
  const value = g[c.x + c.y * w];

  if (value === e) return null;

  for (let x = c.x, y = c.y; x >= 0 && y < c.y + l; x--, y++)
    if (value !== g[x + y * w]) return null;
    else cells.push({ x, y });
  return cells;
}

export default function check_for_win(grid, width, height, length, empty) {
  for (let x = 0; x < width; x++)
    for (let y = 0; y < height; y++) {
      const win =
        horizontal({ x, y }, grid, width, length, empty) ||
        vertical({ x, y }, grid, width, height, length, empty) ||
        diagonal_left({ x, y }, grid, width, height, length, empty) ||
        diagonal_right({ x, y }, grid, width, height, length, empty);

      if (win) return win;
    }
  return null;
}

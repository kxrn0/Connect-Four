export default function get_empty(index, grid, width, height) {
  const values = [];

  for (let i = index; i >= 0; i -= width) values.push(i);
  for (let i = index + width; i < width * height; i += width) values.push(i);

  values.sort((a, b) => b - a);

  return values.find((value) => grid[value] === "empty");
}

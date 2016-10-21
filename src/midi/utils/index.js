export function fromNoteNumber(value) {
  return [ (value % 10) - 1, 8 - Math.floor(value / 10) ];
}

export function toNoteNumber(row, col) {
  return 80 - (row * 10) + (col + 1);
}

export function getRandom(min: number, max: number): number {
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random;
}
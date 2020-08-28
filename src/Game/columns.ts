// TODO: computer does stupid moves like [..., x, .] -> [..., x, c]
// function columnsWithChanceToWin(columns: string[][], coinType: string): string[][] {
//   const notFilled = columns.filter(column => column.length < COLUMN_HEIGHT);
//   const spaceToMove = notFilled.filter(column => )
//   return notFilled;
// }

export const hasSameCoins = (coinType: string, amountOfCoins: number) => (column: string[]): boolean => {
  return column.length > (amountOfCoins - 1) && column.slice(-amountOfCoins).every(coin => coin === coinType);
}

export const isNotFull = (columnHeight: number) => (column: string[]): boolean => {
	return column.length < columnHeight;
}

export function somebodyWillWinHere(columns: string[][], coinType: string): string[][] {
  return columns.filter(column => hasSameCoins(coinType, 3)(column) || hasSameCoins(coinType, 2)(column));
}
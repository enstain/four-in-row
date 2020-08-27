import { useState, useEffect } from "react";
import { COLUMN_HEIGHT, PLAYER_COIN, COMPUTER_COIN, Item, Board, COLUMNS } from "./types";
import { getRandom } from "./utils";

function makeBoard(): Board {
	let board: Board = {};
	for (let i=0; i < COLUMNS; i++) {
		board[i] = [];
	}
	return board;
}

// TODO: computer does stupid moves like [..., x, .] -> [..., x, c]
// function columnsWithChanceToWin(columns: string[][], coinType: string): string[][] {
//   const notFilled = columns.filter(column => column.length < COLUMN_HEIGHT);
//   const spaceToMove = notFilled.filter(column => )
//   return notFilled;
// }

const hasSameCoins = (coinType: string, amountOfCoins: number) => (column: string[]): boolean => {
  return column.length > (amountOfCoins - 1) && column.slice(-amountOfCoins).every(coin => coin === coinType);
}

function isNotFull(column: string[]): boolean {
	return column.length < COLUMN_HEIGHT;
}

function somebodyWillWinHere(columns: string[][], coinType: string): string[][] {
  return columns.filter(column => hasSameCoins(coinType, 3)(column) || hasSameCoins(coinType, 2)(column));
}

function getCandidateColumnToInsertCoin(columns: string[][]): string[] {
  const notFilled = columns.filter(isNotFull);
  const playerWillWinHere = somebodyWillWinHere(notFilled, PLAYER_COIN);
  const computerWillWinHere = somebodyWillWinHere(notFilled, COMPUTER_COIN);

  if (!!playerWillWinHere.length) {
    return playerWillWinHere[0];
  }

  if (!!computerWillWinHere.length) {
    return computerWillWinHere[0]; 
  }
  
  return notFilled[getRandom(0, notFilled.length - 1)];
}

const useGame = () => {
  const [isPlayerMove, setIsPlayerMove] = useState(true);
	const [board, setBoard] = useState(makeBoard());
	const allColumns = Object.keys(board).map((number) => board[number]);
	const notFullColumns = allColumns.filter(isNotFull);
	const isMovePossible = !!notFullColumns.length;
	const playerWins = allColumns.some(hasSameCoins(PLAYER_COIN, 4));
	const computerWins = allColumns.some(hasSameCoins(COMPUTER_COIN, 4));

	useEffect(() => {
		if (isPlayerMove) {
			return;
		}
    
		const columnNumber = allColumns.indexOf(getCandidateColumnToInsertCoin(allColumns));

		setBoard({
			...board,
			[columnNumber]: [...board[columnNumber], COMPUTER_COIN],
		});
		setIsPlayerMove(true);
	}, [board, isPlayerMove, allColumns]);

	const playerMove = (selected: Item) => {
		const number = selected.value as string;

		if (board[number].length >= COLUMN_HEIGHT) {
			return;
		}

		setBoard({
			...board,
			[number]: [...board[number], PLAYER_COIN],
		});
		setIsPlayerMove(false);
	};
  
  return [board, playerMove, isMovePossible, playerWins, computerWins] as const;
}

export default useGame;
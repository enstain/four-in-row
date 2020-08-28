import { useState, useEffect } from "react";
import { COLUMN_HEIGHT, PLAYER_COIN, COMPUTER_COIN, Board, COLUMNS } from "../types";
import { getRandom } from "../utils";
import { isNotFull, somebodyWillWinHere, hasSameCoins } from "./columns";
import { Item } from "../SelectColumn/SelectColumn";

function makeBoard(): Board {
	let board: Board = {};
	for (let i=0; i < COLUMNS; i++) {
		board[i] = [];
	}
	return board;
}

function getCandidateColumnToInsertCoin(columns: string[][]): string[] {
  const notFilled = columns.filter(isNotFull(COLUMN_HEIGHT));
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
	const notFullColumns = allColumns.filter(isNotFull(COLUMN_HEIGHT));
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
  
  return [board, playerMove, isPlayerMove, isMovePossible, playerWins, computerWins] as const;
}

export default useGame;
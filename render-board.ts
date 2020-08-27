import { Item, Board, COLUMN_HEIGHT } from "./types";

export function renderColumn(column: string[]): string {
	return [...column, ...Array(COLUMN_HEIGHT - column.length).fill('.')].join(' ');
} 

export function renderChoices(board: Board): Item[] {
	return Object.keys(board).map((index) => ({ label: `${+index + 1}: ${renderColumn(board[index])}`, value: index }));
}
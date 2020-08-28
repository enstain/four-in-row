import { Board, COLUMN_HEIGHT } from "../types";
import { Item } from "../SelectColumn/SelectColumn";
import { isNotFull } from './columns';

export function renderColumn(index: number, column: string[]): string {
	const columnContent = [...column, ...Array(COLUMN_HEIGHT - column.length).fill('.')];
	return [index, '-', ...columnContent].reverse().join('');
} 

export function renderChoices(board: Board): Item[] {
	return Object.keys(board).map((index) => ({
		key: index,
		label: renderColumn(+index + 1, board[index]),
		value: index,
		disabled: !isNotFull(COLUMN_HEIGHT)(board[index]),
	}));
}
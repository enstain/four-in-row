export const COLUMNS = 6;
export const COLUMN_HEIGHT = 7;
export const PLAYER_COIN = 'x';
export const COMPUTER_COIN = 'c';

export type Board = Record<string, string[]>;

export interface Item {
	key?: string;
	label: string;
	value: unknown;
}
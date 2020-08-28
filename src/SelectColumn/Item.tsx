import * as React from 'react';
import type {FC} from 'react';
import {Text} from 'ink';

export interface Props {
	isSelected?: boolean;
	label: string;
	disabled: boolean;
}

function getColor(isSelected: boolean, isDisabled: boolean): string | undefined {
	if (isDisabled) {
		return 'gray';
	}
	if (isSelected) {
		return 'blue';
	}
	return undefined;
}

const Item: FC<Props> = ({isSelected = false, disabled = false, label}) => (
	<Text color={getColor(isSelected, disabled)}>{label}</Text>
);

export default Item;
import * as React from 'react';
import {useState, useEffect, useRef, useCallback} from 'react';
import type {FC} from 'react';
import {Box, useInput} from 'ink';
import Indicator from './Indicator';
import type {Props as IndicatorProps} from './Indicator';
import Item from './Item';
import type {Props as ItemProps} from './Item';

interface Props {
	/**
	 * Items to display in a list. Each item must be an object and have `label` and `value` props, it may also optionally have a `key` prop.
	 * If no `key` prop is provided, `value` will be used as the item key.
	 */
	items: Item[];

	/**
	 * Index of initially-selected item in `items` array.
	 *
	 * @default 0
	 */
	initialIndex?: number;

	/**
	 * Is selector active
	 *
	 * @default true
	 */
	isActive?: boolean;

	/**
	 * Custom component to override the default indicator component.
	 */
	indicatorComponent?: FC<IndicatorProps>;

	/**
	 * Custom component to override the default item component.
	 */
	itemComponent?: FC<ItemProps>;

	/**
	 * Function to call when user selects an item. Item object is passed to that function as an argument.
	 */
	onSelect?: (item: Item) => void;

	/**
	 * Function to call when user highlights an item. Item object is passed to that function as an argument.
	 */
	onHighlight?: (item: Item) => void;
}

export interface Item {
	key: string;
	label: string;
  value: string;
  disabled: boolean;
}

const SelectColumn: FC<Props> = ({
	items = [],
	initialIndex = 0,
	indicatorComponent = Indicator,
	itemComponent = Item,
	onSelect,
	onHighlight,
	isActive = true,
}) => {
	const [rotateIndex, setRotateIndex] = useState(0);
	const [selectedIndex, setSelectedIndex] = useState(initialIndex);

	useInput(
		useCallback(
			(input, key) => {
				if (key.leftArrow) {
					const lastIndex = items.length - 1;
					const atFirstIndex = selectedIndex === 0;
					const nextIndex = lastIndex;
					const nextRotateIndex = atFirstIndex ? rotateIndex + 1 : rotateIndex;
					const nextSelectedIndex = atFirstIndex
						? nextIndex
						: selectedIndex - 1;

					setRotateIndex(nextRotateIndex);
					setSelectedIndex(nextSelectedIndex);

					if (typeof onHighlight === 'function') {
						onHighlight(items[nextSelectedIndex]);
					}
				}

				if (key.rightArrow) {
					const atLastIndex =
						selectedIndex === (items.length) - 1;
					const nextIndex = 0;
					const nextRotateIndex = atLastIndex ? rotateIndex - 1 : rotateIndex;
					const nextSelectedIndex = atLastIndex ? nextIndex : selectedIndex + 1;

					setRotateIndex(nextRotateIndex);
					setSelectedIndex(nextSelectedIndex);

					if (typeof onHighlight === 'function') {
						onHighlight(items[nextSelectedIndex]);
					}
				}

				if (key.return) {
					const slicedItems = items;

					if (typeof onSelect === 'function') {
						onSelect(slicedItems[selectedIndex]);
					}
				}
			},
			[
				rotateIndex,
				selectedIndex,
				items,
				onSelect,
				onHighlight
			]
		),
		{ isActive }
	);

	return (
		<Box flexDirection="row">
			{items.map((item, index) => {
				const isSelected = index === selectedIndex;

				return (
					<Box key={item.key} width={1} marginRight={1} flexDirection="column">
						{React.createElement(itemComponent, {...item, isSelected})}
						{isActive && React.createElement(indicatorComponent, {isSelected})}
					</Box>
				);
			})}
		</Box>
	);
};

export default SelectColumn;
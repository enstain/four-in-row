import React from 'react';
import SelectInput from 'ink-select-input';
import { Text } from 'ink';
import BoardCard from './Board';
import useGame from './useGame';
import { renderChoices } from './render-board';

const Game = () => {
	const [board, playerMove, isMovePossible, playerWins, computerWins] = useGame();

	if (!isMovePossible || playerWins || computerWins) {
		return (
			<>
				<BoardCard board={board} />
				<Text>
					{!isMovePossible && 'Board is full'}
					{playerWins && 'You win'}
					{computerWins && 'Computer wins'}
				</Text>
			</>
		)
	}

	return <SelectInput items={renderChoices(board)} onSelect={playerMove} />;
};

export default Game;
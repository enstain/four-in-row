import React from 'react';
import { Text } from 'ink';
import useGame from './useGame';
import { renderChoices } from './render';
import SelectColumn from '../SelectColumn/SelectColumn';

const Game = () => {
	const [board, playerMove, isPlayerMove, isMovePossible, playerWins, computerWins] = useGame();
	const isGameOver = !isMovePossible || playerWins || computerWins;

	return (
		<>
			<SelectColumn isActive={!isGameOver} items={renderChoices(board)} onSelect={playerMove} />
			{
				!isGameOver && (
					<Text>
						{ isPlayerMove && 'Its your turn' }
						{ !isPlayerMove && 'Computer thinks...' }
					</Text>
				)
			}
			{
				<Text>
					{!isMovePossible && !playerWins && !computerWins && 'Board is full'}
					{playerWins && 'You win'}
					{computerWins && 'Computer wins'}
				</Text> 
			}
		</>
	);
};

export default Game;
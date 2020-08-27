import { Board } from "./types"
import React from "react";
import { Text, Newline } from 'ink';
import { renderColumn } from "./render-board";

type BoardProps = {
  board: Board;
}

const BoardCard: React.FC<BoardProps> = ({ board }) => {
  return (
    <Text>
      {
        Object.keys(board).map((number) => (
          <Text key={number}>
            {number}: { renderColumn(board[number]) }
            <Newline />
          </Text>
        ))
      }
    </Text>
  )
}

export default BoardCard;
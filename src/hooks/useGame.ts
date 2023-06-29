import { useState } from 'react';

export const useGame = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const directions = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [-1, -1],
    [0, -1],
  ];
  const onClick = (x: number, y: number) => {
    console.log(x, y);
    const newBoard: number[][] = JSON.parse(JSON.stringify(board));
    let p = false;
    if (board[y][x] === 0) {
      for (const [dy, dx] of directions) {
        if (
          board[y + dy] !== undefined &&
          board[y + dy][x + dx] !== undefined &&
          board[y + dy][x + dx] === 3 - turnColor
        ) {
          for (let i = 1; i < 8; i++) {
            if (
              board[y + dy * i] !== undefined &&
              board[y + dy * i][x + dx * i] !== undefined &&
              board[y + dy * i][x + dx * i] === turnColor
            ) {
              let a = 0;
              for (let i2 = 1; i2 <= i; i2++) {
                if (board[y + dy * i2][x + dx * i2] !== 0) {
                  a++;
                }
              }
              if (a === i) {
                newBoard[y][x] = turnColor;
                p = true;
                for (let i2 = 1; i2 < i; i2++) {
                  newBoard[y + dy * i2][x + dx * i2] = turnColor;
                }
              }
              break;
            }
          }
        }
      }
      if (p) {
        setTurnColor(3 - turnColor);
        setBoard(newBoard);
      }
    }
    if (board[y + 1] !== undefined && board[y + 1][x] === 3 - turnColor) {
      newBoard[y][x] = turnColor;
      setTurnColor(3 - turnColor);
    } //y=-x+3
    setBoard(newBoard);
  };
  return { board };
};

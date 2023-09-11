import { useState } from 'react'
import './App.css'
import { TURNS, COMBOS } from './constants/constants';
import { Winner } from './components/Winner';
import { Turns } from './components/Turns';
import { Board } from './components/Board';
import confetti from 'canvas-confetti';


function App() {
  const [board, setBoard] = useState(()=>{
    const getLocalStorage = localStorage.getItem("board")
    if(getLocalStorage) return JSON.parse(getLocalStorage)
    return Array(9).fill(null);
  });

  const [turn, setTurn] = useState(()=>{
    const getLocalStorage = localStorage.getItem("turn");
    if (getLocalStorage) return JSON.parse(getLocalStorage);
    return TURNS.X;
  })

  const [winner, setWinner] = useState(null)


  const checkWinner = (boardToCheck) =>{
    for (const combo of COMBOS){
      const [a, b, c] = combo
      if (boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck [c]){
          return boardToCheck[a]
        }
    }
  }

  const checkGameFinish = (newBoard) => {
    return newBoard.every((part)=> part != null)
  }

  const restartGame = () =>{
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null)
    localStorage.removeItem("board")
  }

  const updateBoard = (index) =>{

    const newBoard = [... board]
    if (newBoard[index] || winner) return
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    localStorage.setItem("board", JSON.stringify(newBoard))
    localStorage.setItem("turn", JSON.stringify(newTurn));
    const newWinner = checkWinner(newBoard)
    if (newWinner){
      confetti()
      setWinner(newWinner)
    } else if (checkGameFinish(newBoard)){
      setWinner(false)
    }
  }

  return (
    <Board restartGame={restartGame} board={board} updateBoard={updateBoard}>
        <Turns turn={turn} />
        {winner != null && <Winner winner={winner} restartGame={restartGame} />}
    </Board>
  );
  
}

export default App

import { Square } from "./Square"

export const Board = ({restartGame, board, updateBoard, children}) =>{
    return(
    <main className="board">
      <button onClick={restartGame}>Reiniciar juego</button>
      <section className="game">
        {board.map((board, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board}
            </Square>
          )
        })}
      </section>
      {children}
    </main>
    )
}
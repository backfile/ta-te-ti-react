import { Square } from "./Square";

export const Winner = ({winner, restartGame}) => {
    return(
    <section className="winner">
      <div className="text">
        <h1>{winner === false ? "Empate" : "Ganó "}</h1>
        <header className="win">{winner && <Square>{winner}</Square>}</header>
        <footer>
          <button onClick={restartGame}>Reiniciar juego</button>
        </footer>
      </div>
    </section>   
    )

}
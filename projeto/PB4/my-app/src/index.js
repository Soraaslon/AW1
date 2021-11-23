/* Importando o react e CSS */
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

/* Renderizando um botão */
function Square(props) {
  /* Componentes recebem parâmetros, chamados props (abreviação de propriedades)  e é isso que props fazem, são a forma como os dados fluem em aplicações React, de pais para filhos.
   */
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

/* Renderizando os Squares */
class Board extends React.Component {
  /* para um componente lembrar que foi clicado por exemplo, nós usamos o state para isso, ele guarda o estado do componente */
  constructor(props) {
    super(props)
    this.state = { squares: Array(9).fill(null), xIsNext: true }
  }

  handleClick(i) {
    const squares = this.state.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({ squares: squares, xIsNext: !this.state.xIsNext })
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    )
  }

  render() {
    const winner = calculateWinner(this.state.squares)
    let status
    if (winner) {
      status = 'Vencedor: ' + winner
      this.state = { squares: Array(9).fill(null), xIsNext: true }
    } else status = 'Próximo jogador: ' + (this.state.xIsNext ? 'X' : 'O')

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

/* Renderizando a borda */
class Game extends React.Component {
  /* Síntaxe especial JSX, ele transforma <div /> em React.createElement ('div') em tempo de compilação, o que deixa mais fácil */
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    )
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'))

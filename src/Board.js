import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps ={
    nrows: 5,
    ncols: 5, 
    chanceLightStartsOn: 0.25
  };

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    };


    // TODO: set initial state
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    
    for(let y = 0; y< this.props.nrows; y++){
      //we make a singel row when we come here
      let row = [];
      //and then we loop over the colums
      for(let x=0; x < this.props.ncols; x++){
        //here we gonna deside if something is on or off, and push it into the row
        //Math.random () will give us a value between 0 and 1, if its over chanceLightStartsOn value will it give true, if not false inside the table
        row.push(Math.random() < this.props.chanceLightStartsOn)
      }
      board.push(row);

    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAroundMe(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    //here we split the coord string, take away the "-" and convert it to numbers
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      //here we check if the cell is valid
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        //here we change the cell, if its was true, we set it to false, and other way around also
        board[y][x] = !board[y][x];
      }
    }

    
    flipCell(y, x);//Flip initial cell
    flipCell(y, x - 1);//flips the cell to the left
    flipCell(y, x + 1);//flips the cell to the right
    flipCell(y - 1, x);//flips the cell belove
    flipCell(y + 1, x);//flips the cell above
    

    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won
    

    //we do !cell to make it returns true 
    //every cell, in every row, should be false
    //every cell, in every row, should be false
    let hasWon = board.every(row => row.every(cell => !cell));


      /* let hasWon = 
    board.every(function(row){
      return row.every(function(cell){
        return !cell
      })
    })
 */
    this.setState({board:board, hasWon:hasWon});
  }


/** Render game board or winning message. */
makeTable() {
  let tblBoard = [];
  for (let y = 0; y < this.props.nrows; y++) {
    let row = [];
    for (let x = 0; x < this.props.ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(
        <Cell
          key={coord}
          isLit={this.state.board[y][x]}
          flipCellsAroundMe={() => this.flipCellsAroundMe(coord)}
        />
      );
    }
    tblBoard.push(<tr key={y}>{row}</tr>);
  }
  return (
    <table className='Board'>
      <tbody>{tblBoard}</tbody>
    </table>
  );
}

render() {
  return (
    <div>
      {this.state.hasWon ? (
        <div className='winner'>
          <span className='neon-orange'>YOU</span>
          <span className='neon-blue'>WIN!</span>
        </div>
      ) : (
        <div>
          <div className='Board-title'>
            <div className='neon-orange'>Lights</div>
            <div className='neon-blue'>Out</div>
          </div>
          {this.makeTable()}
        </div>
      )}
    </div>
  );
}
}

export default Board;

const ROWS = 6
const COLUMNS = 7
var currentPlayer=1;
var scorePlayer1=0;
var scorePlayer2=0;
var lastWinner=0;

function initNewGame(){
  setPlayer(currentPlayer);
  updateScore();
}

function clearScore(){
  scorePlayer1=0;
  scorePlayer2=0;
  newGame();
  updateScore();
}
function newGame(){   // handle the new game button 
  for (row=1;row<=ROWS;row++){
    for(col=1;col<=COLUMNS;col++){
      clearCell(col,row);
    }
  }
  setPlayer(lastWinner==2?1:2);  //let the loser go first.  It's their turn anyways.
}

function updateScore(){
  const EL = document.querySelector(".score");          // 
  const innerHTML =                                     // template strings are kind of neat in that you can have returns in them.
        `<span>Player 1: ${scorePlayer1}</span><br>
         <span>Player 2: ${scorePlayer2}</span>`;
  EL.setHTML(innerHTML);
}

function setCell(col,row,player){
    let el = document.querySelector(`.gamerow:nth-child(${row})>.cell:nth-child(${col})`); // CSS Selector https://www.w3schools.com/cssref/sel_nth-child.php#:~:text=Definition%20and%20Usage,name)%2C%20of%20its%20parent.
    el.classList.add(player);
    let plyr = 1; if (player=="player2")plyr=2;
}

function clearCell(col,row){
    let el = document.querySelector(`.gamerow:nth-child(${row})>.cell:nth-child(${col})`);   
    if (el.classList.contains("player1")) el.classList.remove("player1");
    if (el.classList.contains("player2")) el.classList.remove("player2");
}


function getCell(col,row){
    let el = document.querySelector(`.gamerow:nth-child(${row})>.cell:nth-child(${col})`); // Gets the coordinates of x,y then returns either player 1 or 2.
    if (el.classList.contains("player1")) return "player1";
    if (el.classList.contains("player2")) return "player2";
    return "";
}

function setPlayer(plyr){
    currentPlayer=plyr;
  let el = document.querySelector('#dropzone');
  if (el.classList.contains("player1")) el.classList.remove("player1");
  if (el.classList.contains("player2")) el.classList.remove("player2");
  if (el.classList.contains("player0")) el.classList.remove("player0");  // nobody - so kill the hover effect
  el.classList.add(`player${plyr}`);   // use template literals with string interpolation
  if (plyr>0){
    displayMessage(`It is Player ${plyr}'s turn.`);
  }
}

function dropCol(x){
  if (currentPlayer==0)return;
  let y = findBottom(x);
  if (y>0){
    setCell(x,findBottom(x),`player${currentPlayer}`);
    const winner=checkWinner();
    if (winner !==""){
       switch (winner) {
         case 'player1':
           scorePlayer1++;
           break;
         case 'player2':
           scorePlayer2++;
           break;
       }
      updateScore();
      displayMessage(`<span>Player ${currentPlayer} Won!</span><br><span>Press New Game to play again</span>`);
      lastWinner = currentPlayer;
      setPlayer(0);
    }else{
      let newPlayer = (currentPlayer==2)?1:2;   // ternary logic statement  Flip flops between first and second player
      setPlayer(newPlayer);       
    }
  }
}


function displayMessage(innerHTML){
    el=document.querySelector(".msgs");
    el.setHTML(innerHTML);
}

function findBottom(x){ // add to Y to go down the column, if it runs in to something in cell, go back one.
  for (y=1;y<=6;y++){
    if (getCell(x,y)!="") return y-1; 
  }
  return 6;
}

function checkWinner() {
  //horizontal
  for (let r = 1; r <= ROWS; r++) {
    for (let c = 1; c <= COLUMNS - 3; c++){
      if (getCell(c, r) != '') {
        if (getCell(c, r) == getCell(c+1, r) && getCell(c+1, r) == getCell(c+2, r) && getCell(c+2, r) == getCell(c+3, r)) {
          return getCell(c,r); 
        }
      }
    }
  }
   //vertical (columns)
    for (let c = 1; c <= COLUMNS; c++) {
    for (let r = 1; r <= ROWS - 3; r++){
      if (getCell(c, r) != '') {
        if (getCell(c, r) == getCell(c, r+1) && getCell(c, r+1) == getCell(c, r+2) && getCell(c, r+2) == getCell(c, r+3)) {
          //setWinner(c, r);
          return getCell(c,r); 
        }
      }
    }
  }
  
    //diagonal 1
  for (let r = 1; r <= ROWS - 3; r++) {
    for (let c = 1; c <= COLUMNS - 3; c++){
      if (getCell(c, r) != '') {
        if (getCell(c, r) == getCell(c+1, r+1) && getCell(c+1, r+1) == getCell(c+2, r+2) && getCell(c+2, r+2) == getCell(c+3, r+3)) {
          return getCell(c,r); 
        }
      }
    }
  }
  
      //diagonal 2
  for (let r = 4; r <= ROWS; r++) {
    for (let c = 1; c <= COLUMNS - 3; c++){
      if (getCell(c, r) != '') {
        if (getCell(c, r) == getCell(c+1, r-1) && getCell(c+1, r-1) == getCell(c+2, r-2) && getCell(c+2, r-2) == getCell(c+3, r-3)) {
          return getCell(c,r); 
        }
      }
    }
  }
  return "";
} 
// checkWinner structure from https://github.com/ImKennyYip/Connect4 / youtube. Modified to fit. 

document.addEventListener("DOMContentLoaded", function(event) {
  initNewGame();
});

// inspirations & codepens that helped me understand the logical thinking to build a connect 4 game. 
// https://codepen.io/jeffleu/pen/Kgbewj 
// https://codepen.io/LOUBASSOU/pen/qwBdGN 
// https://codepen.io/caleboleary/pen/reqwzV
// https://www.youtube.com/watch?v=4ARsthVnCTg 
// https://www.youtube.com/watch?v=Hi5hEH1KNEc 
const rows = 6
const columns = 7
var currentPlayer=1;

function initNewGame(){
  setPlayer(currentPlayer);
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
  el.classList.add(`player${plyr}`);   // use template literals with string interpolation
}

function dropCol(x){
  let y = findBottom(x);
  if (y>0){
    setCell(x,findBottom(x),`player${currentPlayer}`);
    const winner=checkWinner();
    if (winner !==""){
      alert(winner +"won!");
      
    }else{
      let newPlayer = (currentPlayer==2)?1:2;   // ternary logic statement  Flip flops between first and second player
      setPlayer(newPlayer);       
    }
  }
}

function findBottom(x){ // add to Y to go down the column, if it runs in to something in cell, go back one.
  for (y=1;y<=6;y++){
    if (getCell(x,y)!="") return y-1; 
  }
  return 6;
}

function checkWinner() {
  //horizontal
  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= columns - 3; c++){
      if (getCell(c, r) != '') {
        if (getCell(c, r) == getCell(c+1, r) && getCell(c+1, r) == getCell(c+2, r) && getCell(c+2, r) == getCell(c+3, r)) {
          return getCell(c,r); 
        }
      }
    }
  }
   //vertical (columns)
    for (let c = 1; c <= columns; c++) {
    for (let r = 1; r <= rows - 3; r++){
      if (getCell(c, r) != '') {
        if (getCell(c, r) == getCell(c, r+1) && getCell(c, r+1) == getCell(c, r+2) && getCell(c, r+2) == getCell(c, r+3)) {
          //setWinner(c, r);
          return getCell(c,r); 
        }
      }
    }
  }
  
    //diagonal 1
  for (let r = 1; r <= rows - 3; r++) {
    for (let c = 1; c <= columns - 3; c++){
      if (getCell(c, r) != '') {
        if (getCell(c, r) == getCell(c+1, r+1) && getCell(c+1, r+1) == getCell(c+2, r+2) && getCell(c+2, r+2) == getCell(c+3, r+3)) {
          return getCell(c,r); 
        }
      }
    }
  }
  
      //diagonal 2
  for (let r = 4; r <= rows; r++) {
    for (let c = 1; c <= columns - 3; c++){
      if (getCell(c, r) != '') {
        if (getCell(c, r) == getCell(c+1, r-1) && getCell(c+1, r-1) == getCell(c+2, r-2) && getCell(c+2, r-2) == getCell(c+3, r-3)) {
          return getCell(c,r); 
        }
      }
    }
  }
  return "";
}

document.addEventListener("DOMContentLoaded", function(event) {
  initNewGame();
});
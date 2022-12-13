
var currentPlayer=1;

function initNewGame(){
  setPlayer(currentPlayer);
}

function setCell(col,row,player){
    let el = document.querySelector(`.gamerow:nth-child(${row})>.cell:nth-child(${col})`);
    el.classList.add(player);
    let plyr = 1; if (player=="player2")plyr=2;
}

function clearCell(col,row){
    let el = document.querySelector(`.gamerow:nth-child(${row})>.cell:nth-child(${col})`);  // again with template literals
    if (el.classList.contains("player1")) el.classList.remove("player1");
    if (el.classList.contains("player2")) el.classList.remove("player2");
}


function getCell(col,row){
    let el = document.querySelector(`.gamerow:nth-child(${row})>.cell:nth-child(${col})`);
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
  setCell(x,findBottom(x),`player${currentPlayer}`);
  let newPlayer = (currentPlayer==2)?1:2;   // ternary logic statement  (cond)?iftrue:iffalse if cp=2 then return 1 otherwise return 2 and so on.
  setPlayer(newPlayer);  
}

function findBottom(x){
  for (y=1;y<=6;y++){
    console.log(getCell(x,y));
    if (getCell(x,y)!="") return y-1; 
  }
  return 6;
}


document.addEventListener("DOMContentLoaded", function(event) {
  initNewGame();
});
function setCell(col,row,player){
    let el = document.querySelector(`.gamerow:nth-child(${row})>.cell:nth-child(${col})`);
    el.classList.add(player);
    let plyr = 1; if (player=="player2")plyr=2;
}

function clearCell(col,row){
    let el = document.querySelector(`.gamerow:nth-child(${row})>.cell:nth-child(${col})`);
    if (el.classList.contains("player1")) el.classList.remove("player1");
    if (el.classList.contains("player2")) el.classList.remove("player2");
}


function getCell(col,row){
    let el = document.querySelector(`.gamerow:nth-child(${row})>.cell:nth-child(${col})`);
    if (el.classList.contains("player1")) return "player1";
    if (el.classList.contains("player2")) return "player2";
    return "";
}

document.addEventListener("DOMContentLoaded", function(event) {
  setCell(1, 1, "player1");
  setCell(2, 2, "player1");
  setCell(3, 3, "player1");
  setCell(4, 4, "player1");

  setCell(4, 4, "player2");
  setCell(5, 3, "player2");
  setCell(6, 2, "player2");
  setCell(7, 1, "player2");
  
  clearCell(4,4);
  clearCell(3,6);
  clearCell(4,6);
  
  console.log(getCell(1,1));
  console.log(getCell(7,1));
  
});
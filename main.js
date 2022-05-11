const btn = document.querySelectorAll('.btn');

function adjust_sz() {
   if(window.innerWidth > window.innerHeight && window.innerHeight > 230){
      let sz = (window.innerHeight) / 4
      document.getElementById('grid').style.gridTemplateRows = `${sz}px ${sz}px ${sz}px`
      document.getElementById('grid').style.gridTemplateColumns = `${sz}px ${sz}px ${sz}px`

      btn.forEach(btn =>{
         btn.style.borderRadius = `${window.innerHeight/20}px`
         btn.style.fontSize = `${window.innerHeight/4}px`
      })
   }
   else if(window.innerWidth < window.innerHeight && window.innerWidth > 230){
      let sz = (window.innerWidth) / 4
      document.getElementById('grid').style.gridTemplateRows = `${sz}px ${sz}px ${sz}px`
      document.getElementById('grid').style.gridTemplateColumns = `${sz}px ${sz}px ${sz}px`

      btn.forEach(btn =>{
         btn.style.borderRadius = `${window.innerWidth/20}px`
         btn.style.fontSize = `${window.innerWidth/4}px`
      })
   }

}

window.addEventListener('resize', adjust_sz);

board = [
   [' '], [' '], [' '],
   [' '], [' '], [' '],
   [' '], [' '], [' ']
]


function log_board(){
   console.log(`[${board[0]}][${board[1]}][${board[2]}]`);
   console.log(`[${board[3]}][${board[4]}][${board[5]}]`);
   console.log(`[${board[6]}][${board[7]}][${board[8]}]`);
}

function isEmpty(pos){
   if(board[pos] == ' '){return true;}
   else{return false;}
}

function gameLogic_Win(isMark, mark=undefined){
   if(!isMark){
      if(board[0] == board[1] && board[1] == board[2] && board[2] != ' '){
         return true;
      } else if(board[3] == board[4] && board[4] == board[5] && board[5] != ' '){
         return true;
      } else if(board[6] == board[7] && board[7] == board[8] && board[8] != ' '){
         return true;
      } else if(board[0] == board[3] && board[3] == board[6] && board[6] != ' '){
         return true;
      } else if(board[1] == board[4] && board[4] == board[7] && board[7] != ' '){
         return true;
      } else if(board[2] == board[5] && board[5] == board[8] && board[8] != ' '){
         return true;
      } else if(board[0] == board[4] && board[4] == board[8] && board[8] != ' '){
         return true;
      } else if(board[2] == board[4] && board[4] == board[6] && board[6] != ' '){
         return true;
      }
   } else if(isMark){
      if(board[0] == board[1] && board[1] == board[2] && board[2] != mark){
         return true;
      } else if(board[3] == board[4] && board[4] == board[5] && board[5] != mark){
         return true;
      } else if(board[6] == board[7] && board[7] == board[8] && board[8] != mark){
         return true;
      } else if(board[0] == board[3] && board[3] == board[6] && board[6] != mark){
         return true;
      } else if(board[1] == board[4] && board[4] == board[7] && board[7] != mark){
         return true;
      } else if(board[2] == board[5] && board[5] == board[8] && board[8] != mark){
         return true;
      } else if(board[0] == board[4] && board[4] == board[8] && board[8] != mark){
         return true;
      } else if(board[2] == board[4] && board[4] == board[6] && board[6] != mark){
         return true;
      }
   }
}

function gameLogic_Draw(){
   for(let i=0;i<board.length;i++){
      if(isEmpty(i)){return false}
   }; return true;
}

function input(pos, mark) {
   document.getElementById(`btn${pos}`).disabled = true;
   if(mark == 'X'){
      document.getElementById(`btn${pos}`).innerHTML = 'X'
      board[pos - 1] = 'X';
      process();
   } else if(mark == 'O'){
      document.getElementById(`btn${pos}`).innerHTML = 'O'
      board[pos - 1] = 'O';
   }
}

function AI(){
   let temp = [];
   for(let i=0;i<board.length;i++){
      if(isEmpty(i)){
         temp.push(i)
      }
   }
   const rand = temp[Math.floor(Math.random()*temp.length)];
   input(rand + 1, 'O');
}

function MINIMAX(){

}

function process(){
   
   if(gameLogic_Win(false)){end('X');return;}
   if(gameLogic_Draw()){end('draw');return;}
   AI();
   if(gameLogic_Win(false)){end('O');return;}
   if(gameLogic_Draw()){end('draw');return;}
}

function end(game_state){
   if(game_state == 'draw'){
      window.setTimeout(function(){
         btn.forEach(btn =>{
            btn.style.backgroundColor = 'brown';
            document.getElementById('end').innerHTML = 'DRAW';
         })
      }, 1000)
      window.setTimeout(function(){
         location.reload();
      }, 2000);
      
   } else if(game_state == 'X'){
      window.setTimeout(function(){
         btn.forEach(btn =>{
            btn.style.backgroundColor = 'brown';
            document.getElementById('end').innerHTML = 'X WINS';
         })
      }, 1000)
      window.setTimeout(function(){
         location.reload();
      }, 2000);
   } else if(game_state == 'O'){
      window.setTimeout(function(){
         btn.forEach(btn =>{
            btn.style.backgroundColor = 'brown';
            document.getElementById('end').innerHTML = 'O WINS';
         })
      }, 1000)
      window.setTimeout(function(){
         location.reload();
      }, 2000);
   }
}

adjust_sz();

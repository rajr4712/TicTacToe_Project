/*fetch all class in js so that apply js code on it */
const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

// how they win a Game X player or 0 player all position written written 
//its if X player at 0,1,2 and 3,4,5 and 6,7,8 and so on then they will win a game same applied to 0 player 
const winningPositions = [
    [0,1,2],             
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialise the game
function initGame() {
    currentPlayer = "X";                                       //at start current player is X 
    gameGrid = ["","","","","","","","",""];                  //all box is empty at starting
    //UI pr all box empty bhi karna padega boxes ko after click NEWGAME button
    boxes.forEach((box, index) => {
        box.innerText = "";                                  //empty all box by forEach loop
// The pointer-event: all CSS property is used to allow all types of pointer events on an element, such as clicking, dragging, scrolling, hovering, etc. 
        boxes[index].style.pointerEvents = "all";
        
        //if winn anyone then background color is win and if click to start new game then color green is remove by this code
        box.classList = `box box${index+1}`;               //all box fetch $(0+1=1box, 0+2=2ndbox and so on..)
    });

    //newGamebtn jo sabse niche show hoga jisme button ko fetch kiya gya hai, classList - btn k css class jaha all style property add hai usko remove kr denge so button will unvisible in this case
    newGameBtn.classList.remove("active");
    //current player is same as it come and  $ k through currentPlayer ki value daal diye sath me
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();          //call a function to enter currentPLayer -x vlaue in top haeding paragraph and all thing


function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    //ui update (put value in heading paragraph who is current player )
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}


  //for win or GameOver all three winningPosition(loc 13 to 21) k index par same value either X or 0
function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and 
      if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
      // and exactly same in value in both three index
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

                //check if winner is X (index pe X hai ya 0)
                if(gameGrid[position[0]] === "X") 
                    answer = "X";
                else {
                    answer = "O";
                } 
                    

            //disable pointer events (if winner is find now aage kisi value pe click nhi hoga)
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

     //now we know X/O any one is a winner then both of three box me css classlist win add kr denge.
                boxes[position[0]].classList.add("win");  //win is css class name jisme green background style pada hai
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    //it means we have a winner
    if(answer !== "" ) {                     //if answer box is not equal to empty  
  //gameinfo is fetch variable loc 3 jisme Top heading paragraph pada hai usme wi nner player -$ k through winnerplayer daal denge.answer is variable jisme winner player x ya 0 me jo hoga pada hpga
        gameInfo.innerText = `Winner Player - ${answer}`;             
        newGameBtn.classList.add("active");                //NEwGame button will visible 
        return;
    }

    //if No one is winner NO Winner Found, let's check whether there is tie
    let fillCount = 0;                     //starting fillcount is 0
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;           
 //foreach loop k through every index pe go fillcount++ means(fillcount=0, 0+1 =1fill,1+1=2fill , 2+1 =3fill box and so on)
    });

    //all 9 box is Filled, game is TIE
    if(fillCount === 9) {                           //all 9box is filled now
        gameInfo.innerText = "Game Tied !";         //game tied display on gameinfo container me 
        newGameBtn.classList.add("active");
    }

}

//handle click function where index is pass
function handleClick(index) {
    if(gameGrid[index] === "" ) {                          // if box index number is empty 
        boxes[index].innerText = currentPlayer;             //box k index pe currentPlayer value put
        gameGrid[index] = currentPlayer;                     //its a grid container wch made of 9 box
        boxes[index].style.pointerEvents = "none";
        //swap karo turn ko if anyone is put a value-
        swapTurn();                                         //swapturn fucntion is called
        //check koi jeet toh nahi gya
        checkGameOver();                                   //checkGameOver function is called 
    }
}

//all 9 box k particular index k upar forEach loop k through go and check box k index(index pass to know wch index pe u are) to enter value on it
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {              //all 9 box pe click pe handleClick function run
        handleClick(index);
    })
});

//newGame button me apply eventlistner when click to NEwgame button call initgame (now check what initGame actually do? loc24)
newGameBtn.addEventListener("click", initGame);
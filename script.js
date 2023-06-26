
const root = document.querySelector(`:root`);
const turnImg = document.querySelector(`.img_turn`);
const boardField = document.querySelectorAll(`.board_field`);
const resetButton = document.querySelector(`.reset`);


const Player =(sign) =>{
    this.sign = sign;

    const getSign = sign;
    const hoverImg = `url(./assets/icon-${sign}-outline.svg)`
    const solidImg = `url(./assets/icon-${sign}.svg)`
    const turnImg = `./assets/icon-${sign}-gray.svg`

    return {getSign, hoverImg,solidImg,turnImg};
}

const GameBoardModule =(()=>{
    const gameBoard = [``,``,``,``,``,``,``,``,``];

    const setField =(index, sign) =>{
            gameBoard[index] = sign;
    }
    const getField = (index) =>{
            return gameBoard[index];
    }
    const reset =() =>{
        for(let i=0; i<gameBoard.length;i++)
        {
            gameBoard[i]= ``;
        }
    }
    return {gameBoard,setField,getField,reset};
})();


const GameController =(()=>{
    PlayerX = Player(`x`);
    PlayerO = Player(`o`);

    CurrentPlayer = PlayerX;

    let round =1;
    let winner = `F`;
    let turn = false;
    let Xwin=0;
    let Owin=0;
    let tie=0;


    const setDiv = (e) =>{
        GameBoardModule.setField(e.dataset.id, CurrentPlayer.getSign);
        e.classList.remove(`new`);
        e.classList.add(`solid`);
        e.style.backgroundImage = CurrentPlayer.solidImg;
        checkWinner();
        switchPlayer();
        if(round ==9 && winner==`F`)
        {
            tie++;
            updateScore();
            alert(`It's a tie`);
            resetRound();
        }
        if(winner !==`F`)
        {
            if(winner == `x`) Xwin++;
            else Owin++;
            updateScore();
            alert(winner +`wins`);
            resetRound();
        }
        round++;
    }


    const switchPlayer = () => {
        if(turn){
            CurrentPlayer = PlayerX;
            
        }
        else{
            CurrentPlayer = PlayerO;
        }
        root.style.setProperty('--hoverImg', CurrentPlayer.hoverImg);
        turnImg.src = CurrentPlayer.turnImg;
        turn = !turn;
    }

    const updateScore =() => {
        const score = document.querySelectorAll(`.bold`);
        score.forEach(s => {
            if(s.classList.contains(`x_score`))      
                s.innerHTML = Xwin;
            if(s.classList.contains(`o_score`))
                s.innerHTML = Owin;
                if(s.classList.contains(`ties_score`))
                s.innerHTML = tie;
        })
    }

    const checkWinner = () => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8], 
            [2, 4, 6]
        ];

        winningCombinations.forEach(element => {
            if((GameBoardModule.gameBoard[element[0]]===GameBoardModule.gameBoard[element[1]])
            && (GameBoardModule.gameBoard[element[0]]===GameBoardModule.gameBoard[element[2]])
            && GameBoardModule.gameBoard[element[0]]!==``)
                 winner= GameBoardModule.gameBoard[element[0]] ;
            }
        )
    };

    const resetRound = () =>{

        GameBoardModule.reset();
        round =1;
        winner =`F`;
        turn = false;
        CurrentPlayer = PlayerX;
        boardField.forEach(element=>{
            element.classList.remove(`solid`);
            element.classList.add(`new`);
            element.style.backgroundImage = ``;
        })
    };
    
    return {round,setDiv,resetRound};

})();

boardField.forEach(element => element.addEventListener(`click`, ()=>{
    GameController.setDiv(element);
}));

resetButton.addEventListener(`click`, ()=>{GameController.resetRound()});







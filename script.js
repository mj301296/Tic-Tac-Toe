
const root = document.querySelector(`:root`);
const turnImg = document.querySelector(`.img_turn`);
const boardField = document.querySelectorAll(`.board_field`);
const resetButton = document.querySelector(`.reset`);
const startButton = document.querySelector(`.start_button`);
const main = document.querySelector(`main`);
const initializer = document.querySelector(`.initializer`);
const result = document.querySelector(`.result`);
const quit = document.querySelector(`.quit`);
const nextRound = document.querySelector(`.next_round`);


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
        e.classList.add(`solid`);
        e.style.backgroundImage = CurrentPlayer.solidImg;
        checkWinner();
        switchPlayer();
        if(round ==9 && winner==`F`)
        {
            tie++;
            updateScore();
            result.classList.remove(`disabled`);
            result.childNodes[1].innerHTML =`It's a tie!`;
        }
        if(winner !==`F`)
        {
            if(winner == `x`) Xwin++;
            else Owin++;
            updateScore();
            result.classList.remove(`disabled`);
            result.childNodes[1].innerHTML =`Congratulations!`;
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
            if((GameBoardModule.getField(element[0])===GameBoardModule.getField(element[1]))
            && (GameBoardModule.getField(element[0])===GameBoardModule.getField(element[2]))
            && GameBoardModule.getField(element[0])!==``){
                 winner= GameBoardModule.getField(element[0]);
                 highlightWinner(element, winner);
                
            }
            }
        )
    }; 

    const highlightWinner = (indexes, winner) =>{
            console.log(indexes)
            boardField.forEach(b =>{
                if(indexes.includes(Number(b.dataset.id))){
                    console.log(b.dataset.id)
                    if(winner === `x`)
                    {
                        b.style.backgroundColor = `#34C3BE`;
                        b.style.backgroundImage = `url(./assets/icon-x-transparent.svg)`
                    }
                    else
                    {
                        b.style.backgroundColor = `#F2B138`;
                        b.style.backgroundImage = `url(./assets/icon-o-transparent.svg)`
                    }
                }
            })
    }

    const resetRound = () =>{
        GameBoardModule.reset();
        round =1;
        winner =`F`;
        turn = false;
        CurrentPlayer = PlayerX;
        turnImg.src = CurrentPlayer.turnImg;
        root.style.setProperty('--hoverImg', CurrentPlayer.hoverImg);
        boardField.forEach(element=>{
            element.classList.remove(`solid`);
            element.style.backgroundImage = ``;
            element.style.backgroundColor = `#1E3640`;
        })
    };
    const quit = () =>{
        resetRound();
        Xwin =0;
        Owin =0;
        tie =0;
        updateScore();
    }
    
    return {round,setDiv,resetRound,quit};

})();

boardField.forEach(element => element.addEventListener(`click`, ()=>{
    if(!element.classList.contains(`solid`))
        GameController.setDiv(element);
}));


startButton.addEventListener(`click`,()=>{
    console.log(main)

    main.classList.remove(`disabled`);
    initializer.classList.add(`disabled`);

})
resetButton.addEventListener(`click`, ()=>{GameController.resetRound()});


nextRound.addEventListener(`click`, ()=>{
    GameController.resetRound();
    result.classList.add(`disabled`);
})


quit.addEventListener(`click`, ()=>{
    GameController.quit();
    result.classList.add(`disabled`);
    main.classList.add(`disabled`);
    initializer.classList.remove(`disabled`);
})








import {Modal} from "./modal.js";

export const game = (function(){

    // dom caching-----------------------------------------------------
    const game = document.querySelector(".game");

    const gameBtns = game.querySelectorAll(".game__button");
    const gameBody = game.querySelector(".game__body");
    const gameResult = game.querySelector(".game__result");
    const gamePlayer = game.querySelector(".game__player-button");
    const gameHouseWrapper = game.querySelector(".game__house-wrapper")
    const gameHouse = game.querySelector(".game__house-button")
    const gameHouseBtn = game.querySelector(".game__house-button")
    const gameWinnerText = game.querySelector(".game__winner");
    const gameRulesBtn = game.querySelector(".game__rules");

    // variables ----------------------------------------------------
    const _gameBodyAnimationTime = 1500;
    const _HouseChoiceAnimationTime = 2000; 
    const _houseAnimationRunTime = 1700;
    const _houseAnimationsConstant = 1800;
    const _computerChoiceDisplayDelay = 2500;

    const _gameChoices = ["scissors","paper","rock","spock","lizard"];
    let _playerChoice;
    let _houseChoice;
    let _winner;
    let _randomIntLoop;



    // functions--------------------------------------------------------
    const _init = () => {
        _bindEvents()
    }

    const _bindEvents = () => {

        // click evenets on game buttons ------------------------------
        gameBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                bodyAnimateOut();
                // record play choice 
                _playerChoice = btn.dataset.value; 
                // when the exit animation is run 
                setTimeout(()=> {
                    hideGameBody();
                    gameResultSetState(gamePlayer,"player",_playerChoice);
                    showGameResult();
                },_gameBodyAnimationTime)

                // simulate house choocing randomly 
                simulateHouseChoices()

                // show the house's choice after simulating the choice is done 
                setTimeout(() => {
                    resultRemoveEmptyCircle();
                    gameResultSetState(gameHouse,"house",_houseChoice);
                },_randomIntLoop * _computerChoiceDisplayDelay);
                
                // show the final state of result 
                setTimeout(()=> {
                    resultFinalState();
                }, _randomIntLoop * _computerChoiceDisplayDelay + 1000);

                
                decideWinner(gamePlayerRules(),_playerChoice,_houseChoice)
                console.log("the winner is",_winner);

            })

            // behavior of the ruels button 
            gameRulesBtn.addEventListener("click", Modal.activateModal);
        })
    }


    const bodyAnimateOut = () =>{
        gameBody.classList.add("game__body--hidden");

    }
    const bodyAnimateIn = () =>{
        gameBody.classList.remove("game__body--hidden");

    }

    const hideGameBody = () => {
        gameBody.classList.add("hidden")
    }

    const showGameBody = () => {
        gameBody.classList.remove("hidden")
    }
    const hideGameResult = () => {
        gameResult.classList.add("hidden")
    }

    const showGameResult = () => {
        gameResult.classList.remove("hidden")
    }

    const gameResultSetState = (element,player,state) => {
        element.classList.add(`game__button--${state}`);
        element.classList.add(`game__${player}-button--${state}`);
    }

    const gameResultRemoveState = (element,player,state) => {
        element.classList.remove(`game__button--${state}`);
        element.classList.remove(`game__${player}-button--${state}`);
    }

    const houseBtnAddState = (state) => {
        gameHouseBtn.classList.add(`game__house-button--circle-${state}`);
    }

    const houseBtnRemoveState = (state) => {
        gameHouseBtn.classList.remove(`game__house-button--circle-${state}`);
    }

    const resultRemoveEmptyCircle = () => {
        gameHouse.classList.remove("game__house-button--circle-empty")
    }

    const resultAddEmptyCircle = () => {
        gameHouse.classList.add("game__house-button--circle-empty")
    }

    // transitioning to result's final state 
    const resultFinalState = () => {
        gameResult.classList.remove("game__result--intro")
    } 

    // To determine the winner we only need to cover scenarios where the player or house wins
    const gamePlayerRules = () => {
        // all the scenarios that lear to the player winning 
        let rules = [
            {playerChoice:"scissors",houseChoice: "paper",winner:"player"},
            {playerChoice:"scissors",houseChoice: "lizard",winner:"player"},
            {playerChoice:"paper",houseChoice: "rock",winner:"player"},
            {playerChoice:"paper",houseChoice: "spock",winner:"player"},
            {playerChoice:"rock",houseChoice: "lizard",winner:"player"},
            {playerChoice:"rock",houseChoice: "scissors",winner:"player"},
            {playerChoice:"lizard",houseChoice: "spock",winner:"player"},
            {playerChoice:"lizard",houseChoice: "paper",winner:"player"},
            {playerChoice:"spock",houseChoice: "scissors",winner:"player"},
            {playerChoice:"spock",houseChoice: "rock",winner:"player"},
            ]
        return rules;
    }

    // deciding the winner 
    const decideWinner = (rules,player,house) => {
        if(player === house){
            _winner = "none";
        } else{
            // if you find a match for the condition set _winner and exit
            for (const item of rules){
                let {playerChoice,houseChoice,winner} = item;
                if(playerChoice === player && houseChoice === house ){
                    _winner = winner;
                    return;
                }
                _winner = "house";
            }
        }
    }

    const gameUpdateWinnerText = () => {
        let text = (_winner === "player") ? "player" : (_winner === "house") ? "house" : "tie";
        return text;
    }


    // updating the winner text 
    const updateGameWinner = () => {

    }

    // includes min but not max 
    const getRamdomInt = (minv,maxv) => {
        let min = Math.ceil(minv);
        let max = Math.floor(maxv)
        return Math.floor(Math.random() * (max - min) + min)
    }

    // simulate house chosing a randomly 
    const simulateHouseChoices= () => {
        _randomIntLoop = getRamdomInt(5,10);
        let computerChoices=  []
        for(let i=0; i <= _randomIntLoop; i++) {
            // picking a random choice 
            let choice =  _gameChoices[getRamdomInt(1,5)];
            computerChoices.push(choice)
            setTimeout(()=> {
                houseBtnAddState(choice);
                setTimeout(()=>{houseBtnRemoveState(choice)}, _houseAnimationRunTime)
            },_HouseChoiceAnimationTime + (_houseAnimationsConstant * i))
        }
        _houseChoice = computerChoices.pop();
    
    }
    // initialization ---------------------------------------------------
    _init()


    // public API--------------------------------------------------------
    return{

    }
    
})()
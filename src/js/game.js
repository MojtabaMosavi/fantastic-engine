import {Modal} from "./modal.js";

export const game = (function(){
    document.addEventListener("DOMContentLoaded",()=> {

    // dom caching-----------------------------------------------------
    const game = document.querySelector(".game");

    const gameBtns = game.querySelectorAll(".game__button");
    const gameBody = game.querySelector(".game__body");
    const gameResult = game.querySelector(".game__result");
    const gamePlayer = game.querySelector(".game__player-button");
    const gameHouseWrapper = game.querySelector(".game__house-wrapper");
    const gamePlayerWrapper = game.querySelector(".game__player-wrapper");
    const gameHouse = game.querySelector(".game__house-button")
    const gameHouseBtn = game.querySelector(".game__house-button")
    const gameWinnerText = game.querySelector(".game__winner");
    const gameRulesBtn = game.querySelector(".game__rules");
    const gameScore = game.querySelector(".game__score");
    const gameReplayBtn = game.querySelector(".game__replay");

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
    let _score = 0;



    // functions--------------------------------------------------------
    const _init = () => {
        _updateScoreDisplay();
        _bindEvents()
    }

    const _bindEvents = () => {

        // click evenets on game buttons ------------------------------
        gameBtns.forEach(btn => { 
            btn.addEventListener("click", () => {_startGame(btn)});
        })
        
        // behavior of the ruels button --------------------------------------
        gameRulesBtn.addEventListener("click", Modal.activateModal);
        
        // replay button ---------------------------------------------------
        gameReplayBtn.addEventListener("click",_gameReset)
    }

    const _startGame = (btn)=>{
        bodyAnimateOut();
        // record play choice 
        _playerChoice = btn.dataset.value; 
        // when the exit animation is run 
        setTimeout(()=> {
            hideGameBody();
            _gameResultSetState(gamePlayer,"player",_playerChoice);
            showGameResult();
        },_gameBodyAnimationTime)

        // simulate house choocing randomly 
        _simulateHouseChoices()

        // show the house's choice after simulating the choice is done 
        setTimeout(() => {
            _resultRemoveEmptyCircle();
            _gameResultSetState(gameHouse,"house",_houseChoice);
        },_randomIntLoop * _computerChoiceDisplayDelay);
        
        // show the final state of result 
        setTimeout(()=> {
            _decideWinner(getPlayerRules(),_playerChoice,_houseChoice)
            _updateWinnerText();
            _updateScoreDisplay();
            _resultRemoveFirstState();
            _AddWinnerAnimation(_winner);

        }, _randomIntLoop * _computerChoiceDisplayDelay + 1000);
    }

    // restart game resets t its initial state
    const _gameReset = () => {
        _updateScoreDisplay();
        // resets states set on body 
        bodyAnimateIn();
        showGameBody();
        // remove the animation set on the winner 
        _removeWinnerAnimation(_winner);
        // remove the state set on this elements 
        _gameResultRemoveState(gamePlayer,"player",_playerChoice);
        _gameResultRemoveState(gameHouse,"house",_houseChoice);
        _resultAddEmptyCircle();
        // reset states set on the result section 
        hideGameResult();
        _resultAddFirstState();
        _resultAddFinalState();

    }
 
    // hidding and showing the body = first state of the game with and without aniamtion
    const hideGameBody = () => {
        gameBody.classList.add("hidden")
    }

    const showGameBody = () => {
        gameBody.classList.remove("hidden")
    }    
    
    const bodyAnimateOut = () =>{
        gameBody.classList.add("game__body--hidden");
    }

    const bodyAnimateIn = () =>{
        gameBody.classList.remove("game__body--hidden");
    }

    // Setting and removing the state a btn 
    const _gameResultSetState = (element,player,state) => {
        element.classList.add(`game__button--${state}`);
        element.classList.add(`game__${player}-button--${state}`);
    }

    const _gameResultRemoveState = (element,player,state) => {
        element.classList.remove(`game__button--${state}`);
        element.classList.remove(`game__${player}-button--${state}`);
    }

    // removing and adding the circle on right side on result__game--intro
    const _resultRemoveEmptyCircle = () => {
        gameHouse.classList.remove("game__house-button--circle-empty")
    }

    const _resultAddEmptyCircle = () => {
        gameHouse.classList.add("game__house-button--circle-empty")
    }

    const _houseBtnAddState = (state) =>{
        gameHouse.classList.add(`game__house-button--circle-${state}`)
    }

    const _houseBtnRemoveState = (state) =>{
        gameHouse.classList.remove(`game__house-button--circle-${state}`)
    }
    // tr
    // transitioning to result's final state 
    const _resultAddFirstState = () => {
        gameResult.classList.add("game__result--intro")
    }

    const _resultRemoveFirstState = () => {
        gameResult.classList.remove("game__result--intro");
    }

    const _resultAddFinalState = () => {
        gameResult.classList.add("game__result--active");
    }

    const _resultRemoveFinalState = () => {
        gameResult.classList.remove("game__result--active");
    }
    // hidding and showing the result section = second state of the game
    const hideGameResult = () => {
        gameResult.classList.add("hidden")
    }

    const showGameResult = () => {
        gameResult.classList.remove("hidden")
    }


    // To determine the winner we only need to cover scenarios where the player or house wins
    const getPlayerRules = () => {
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
    const _decideWinner = (rules,player,house) => {
        if(player === house){
            _winner = "none";
        } else{
            // if you find a match for the condition set _winner and exit
            for (const item of rules){
                let {playerChoice,houseChoice,winner} = item;
                if(playerChoice === player && houseChoice === house ){
                    _winner = winner;
                    _score += 1;
                    localStorage.setItem("score",_score);
                    return;
                }
            }
            _winner = "house";
            _score -= 1;
            localStorage.setItem("score",_score);

        }
    }

    const _updateWinnerText = () => {
        let text = (_winner === "player") ? "you win" : (_winner === "house") ? "you lose" : "it's a Tie";
        gameWinnerText.textContent = text; 
    }

    const _updateScoreDisplay = () => {
        gameScore.innerText = localStorage.getItem("score");
    }

    // adding and removing winner animations
    const _AddWinnerAnimation = (winner)=> {
        if(winner !== "none"){
            (winner === "player") ? 
            gamePlayerWrapper.classList.add("game__player-wrapper--winner"):
            gameHouseWrapper.classList.add("game__house-wrapper--winner");
        }
    }
    const _removeWinnerAnimation= (winner)=> {
        if(winner !== "none"){
            (winner === "player") ? 
            gamePlayerWrapper.classList.remove("game__player-wrapper--winner"):
            gameHouseWrapper.classList.remove("game__house-wrapper--winner");
        }
    }

    // includes min but not max 
    const getRamdomInt = (minv,maxv) => {
        let min = Math.ceil(minv);
        let max = Math.floor(maxv)
        return Math.floor(Math.random() * (max - min) + min)
    }

    // simulate house chosing a randomly 
    const _simulateHouseChoices= () => {
        _randomIntLoop = getRamdomInt(5,10);
        let computerChoices=  []
        for(let i=0; i <= _randomIntLoop; i++) {
            // picking a random choice 
            let choice =  _gameChoices[getRamdomInt(1,5)];
            computerChoices.push(choice)
            setTimeout(()=> {
                _houseBtnAddState(choice);
                setTimeout(()=>{_houseBtnRemoveState(choice)}, _houseAnimationRunTime)
            },_HouseChoiceAnimationTime + (_houseAnimationsConstant * i))
        }
        _houseChoice = computerChoices.pop();
    }
    
    // initialization ---------------------------------------------------
    _init()


    // public API--------------------------------------------------------
    return{
        hideGameBody:hideGameBody,
        showGameBody:showGameBody,
        bodyAnimateIn:bodyAnimateIn,
        bodyAnimateOut:bodyAnimateOut,
        hideGameResult:hideGameResult,
        showGameResult:showGameResult,
        getPlayerRules:getPlayerRules,
        getRamdomInt:getRamdomInt,
    }
})})()
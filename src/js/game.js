
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
    // variables ----------------------------------------------------
    const _gameBodyAnimationTime = 1500;
    const _HouseChoiceAnimationTime = 2000; 
    const _houseAnimationRunTime = 1700;
    const _houseAnimationsConstant = 1800;

    const _gameChoices = ["scissors","paper","rock","spock","lizard"];
    let _playChoice;
    let _houseChoice;
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
                // when the exit animation is run 
                setTimeout(()=> {
                    hideGameBody();
                    // record play choice 
                    _playChoice = btn.dataset.value; 
                    gameResultSetState(gamePlayer,"player",_playChoice);
                    showGameResult();
                },_gameBodyAnimationTime)
                simulateHouseChoices()
                setTimeout(() => {
                    resultRemoveEmptyCircle()
                    gameResultSetState(gameHouse,"house",_houseChoice);
                },_randomIntLoop * 2500)

            })
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

    const gameResultRemoveState = (element,state) => {
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

    // includes min but not max 
    const getRamdomInt = (minv,maxv) => {
        let min = Math.ceil(minv);
        let max = Math.floor(maxv)
        return Math.floor(Math.random() * (max - min) + min)
    } 


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

    _init()


    // public API--------------------------------------------------------
    return{

    }
    
})()
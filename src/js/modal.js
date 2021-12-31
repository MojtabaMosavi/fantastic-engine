

export const Modal = (function(){

    // dom caching --------------------------------------------
    const modal = document.querySelector(".modal");
    const modalBtn = modal.querySelector(".modal__button");

    // functions ----------------------------------------------
    const _bindEvents = () =>{

        // closing the modal 
        modalBtn.addEventListener("click", deactivateModel)
    }

    const _init = () => {
        _bindEvents()
    }

    const activateModal = () => {
        modal.classList.add("modal--active")
    }

    const deactivateModel = () => {
        modal.classList.remove("modal--active")
    }

    // initializing ----------------------------------------
    _init()

    // public api -------------------------------------------
    return {
        activateModal:activateModal,
        deactivateModel:deactivateModel,
    }
})()


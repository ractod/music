const initialState = {
    loginModal: { isOpen: false },
    signupModal: { isOpen: false },
    addToPlaylistModal: { isOpen: false, data: null },
    songOptionModal: { isOpen: false, data: null },
    removePlaylistModal: { isOpen: false, data: null },
    addPlaylistModal: { isOpen: false }
}

function modalsRecuder(state = initialState, action) {
    switch(action.type) {
        case "OPEN_MODAL": 
            return { 
                ...state, 
                [action.payload.modalName]: { isOpen: true, data: action.payload.data } 
            }
        case "CLOSE_MODAL":
            return {
                ...state, 
                [action.payload.modalName]: { isOpen: false, data: null }
            }
        default:
            return state
    }
}

export default modalsRecuder
import { combineReducers } from "redux";
import modalsRecuder from "@reduxmodals/reducer";

const rootReducer = combineReducers({
    modalsState: modalsRecuder
})

export default rootReducer
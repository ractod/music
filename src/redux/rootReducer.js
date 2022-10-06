import { combineReducers } from "redux";
import modalsRecuder from "@reduxmodals/reducer";
import authReducer from "@reduxauth/authReducer";

const rootReducer = combineReducers({
    modalsState: modalsRecuder,
    authState: authReducer
})

export default rootReducer
import userReducer from "./reducers/userReducer";
import ADMINReducer from "./reducers/adminReducer";

const { combineReducers } = require("redux");

const rootReducer=combineReducers({
userState:userReducer,
adminState:ADMINReducer

})
export default rootReducer
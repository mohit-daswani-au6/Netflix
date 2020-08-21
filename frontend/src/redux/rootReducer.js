import userReducer from "./reducers/userReducer";
import ADMINReducer from "./reducers/adminReducer";
import MoviesReducer from "./reducers/movieReducer";
import WatchlistReducer from "./reducers/watchlistReducer";
import SubscriptionReducer from "./reducers/subscriptionReducer";

const { combineReducers } = require("redux");

const rootReducer=combineReducers({
userState:userReducer,
adminState:ADMINReducer,
movieState:MoviesReducer,
watchlistState:WatchlistReducer,
subscriptionState:SubscriptionReducer

})
export default rootReducer
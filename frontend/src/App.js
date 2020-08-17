import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ProfilePage from "./pages/ProfilePage";
// import AdminPage from "./pages/AdminPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ForgotPasswordChange from "./pages/ForgotPasswordChange";
import HomePage from './pages/HomePage';
import MoviePlayerPage from "./pages/MoviePlayerPage";
import AddProductPage from "./pages/AddProductPage";
import WatchlistPage from "./pages/WatchlistPage";
function App() {
  return (
    <div className="App">
      {/* <NavBar /> */}
      <Switch>
        <Route exact path="/user/register" component={RegisterPage} />
        <Route exact path="/user/Login" component={LoginPage} />
        <Route exact path="/user/profile" component={ProfilePage} />
        {/* <Route exact path="/admin" component={AdminPage} /> */}
        <Route exact path="/admin/addProduct" component={AddProductPage} />
        <Route exact path="/user/forgotPassword" component={ForgotPasswordPage} />
        <Route exact path="/user/forgot_password/:token" component={ForgotPasswordChange} />
        <Route
          exact
          path="/user/verify/:token"
          component={EmailVerificationPage}
        />
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/movies/:MovieId" component={MoviePlayerPage}/>
        <Route exact path="/user/watchlist" component={WatchlistPage}/>
        {/* <Redirect to="/user/login"/> */}
      </Switch>
    </div>
  );
}

export default App;

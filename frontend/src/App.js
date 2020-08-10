import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ForgotPasswordChange from "./pages/ForgotPasswordChange";
// import HomePage from './pages/HomePage';
function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/user/register" component={RegisterPage} />
        <Route exact path="/user/Login" component={LoginPage} />
        <Route exact path="/user/profile" component={ProfilePage} />
        <Route exact path="/admin" component={AdminPage} />
        <Route exact path="/user/forgotPassword" component={ForgotPasswordPage} />
        <Route exact path="/user/forgot_password/:token" component={ForgotPasswordChange} />
        <Route
          exact
          path="/user/verify/:token"
          component={EmailVerificationPage}
        />
        {/* <Route exact path="/" component={HomePage}/> */}
        {/* <Redirect to="/user/login"/> */}
      </Switch>
    </div>
  );
}

export default App;

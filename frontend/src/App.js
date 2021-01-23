import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./screens/LandingPage";
import MenuScreen from "./screens/MenuScreen";
import ContactsScreen from "./screens/ContactsScreen";
import BasketScreen from "./screens/BasketScreen";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/app.css";

function App() {
  return (
    <>
      <Router>
        <LandingPage />
        <Route path="/basket" component={BasketScreen} />
        <Route path="/contacts" component={ContactsScreen} />
        <Route path="/" component={MenuScreen} exact />
      </Router>
    </>
  );
}

export default App;

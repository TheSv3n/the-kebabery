import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import LandingPage from "./screens/LandingPage";
import MenuScreen from "./screens/MenuScreen";
import ContactsScreen from "./screens/ContactsScreen";
import BasketScreen from "./screens/BasketScreen";
import MealScreen from "./screens/MealScreen";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/app.css";

function App() {
  return (
    <>
      <Router>
        <LandingPage />
        <Container>
          <Route path="/meal/:id" component={MealScreen} />
          <Route path="/basket" component={BasketScreen} />
          <Route path="/contacts" component={ContactsScreen} />
          <Route path="/" component={MenuScreen} exact />
        </Container>
      </Router>
    </>
  );
}

export default App;

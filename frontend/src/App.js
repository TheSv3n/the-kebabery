import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import LandingPage from "./screens/LandingPage";
import MenuScreen from "./screens/MenuScreen";
import ContactsScreen from "./screens/ContactsScreen";

function App() {
  return (
    <>
      <Router>
        <LandingPage />
        <Route path="/contacts" component={ContactsScreen} />
        <Route path="/" component={MenuScreen} exact />
      </Router>
    </>
  );
}

export default App;

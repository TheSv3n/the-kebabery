import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import LandingPage from "./screens/LandingPage";

function App() {
  return (
    <Router>
      <Route path="/" component={LandingPage} exact />
    </Router>
  );
}

export default App;

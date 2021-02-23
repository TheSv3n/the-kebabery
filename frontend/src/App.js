import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import LandingPage from "./screens/LandingPage";
import MenuScreen from "./screens/MenuScreen";
import ContactsScreen from "./screens/ContactsScreen";
import BasketScreen from "./screens/BasketScreen";
import MealScreen from "./screens/MealScreen";
import LoginScreen from "./screens/LoginScreen";
import DeliveryScreen from "./screens/DeliveryScreen";
import OrderSummaryScreen from "./screens/OrderSummaryScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserDetailsScreen from "./screens/UserDetailsScreen";
import MealListScreen from "./screens/MealListScreen";
import MealEditScreen from "./screens/MealEditScreen";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/app.css";

function App() {
  return (
    <>
      <Router>
        <LandingPage />
        <Container>
          <Route path="/admin/meal/:id/edit" component={MealEditScreen} />
          <Route path="/admin/meallist" component={MealListScreen} />
          <Route path="/admin/user/:id/edit" component={UserDetailsScreen} />
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/orders" component={OrderListScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/ordersummary" component={OrderSummaryScreen} />
          <Route path="/meal/:id" component={MealScreen} />
          <Route path="/basket" component={BasketScreen} />
          <Route path="/contacts" component={ContactsScreen} />
          <Route path="/delivery" component={DeliveryScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/" component={MenuScreen} exact />
        </Container>
      </Router>
    </>
  );
}

export default App;

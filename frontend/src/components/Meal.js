import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToBasket } from "../actions/basketActions";

const Meal = ({ meal }) => {
  const dispatch = useDispatch();
  const addToBasketHandler = () => {
    dispatch(addToBasket(meal));
  };

  return (
    <li
      className={
        "list-group-item meal-list-item d-flex text-center my-1 my-md-2 my-lg-2"
      }
      onClick={() => addToBasketHandler(meal)}
    >
      <Container>
        <Row>
          <Col>{meal.name}</Col>
          <Col>£{meal.price.toFixed(2)}</Col>
        </Row>
        <Row>
          <Col className="description">{meal.description}</Col>
        </Row>
      </Container>
    </li>
  );
};

export default Meal;

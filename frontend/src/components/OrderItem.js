import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeFromBasket } from "../actions/basketActions";

const OrderItem = ({ meal }) => {
  const dispatch = useDispatch();

  const removeFromBasketHandler = (meal) => {
    dispatch(removeFromBasket(meal.meal));
  };
  return (
    <li className={"list-group-item d-flex text-center my-1 my-md-2 my-lg-2"}>
      <Col md={10}>
        <Row>
          <Col>{meal.name}</Col>
          <Col>£{(meal.price + meal.optionsPrice).toFixed(2)}</Col>
        </Row>
        <Row>
          {meal.options.map((option) => (
            <Col className="description">
              {option.name}: {option.option}
            </Col>
          ))}
        </Row>
      </Col>
      <Col md={2}>
        <Button
          type="button"
          variant="light"
          onClick={() => {
            removeFromBasketHandler(meal);
            console.log(meal);
          }}
        >
          <i className="fas fa-trash" />
        </Button>
      </Col>
    </li>
  );
};

export default OrderItem;

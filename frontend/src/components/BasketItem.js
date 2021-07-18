import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeFromBasket } from "../actions/basketActions";

const BasketItem = ({ meal }) => {
  const dispatch = useDispatch();

  const removeFromBasketHandler = (meal) => {
    dispatch(removeFromBasket(meal.tempId));
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
              {option.name}: {option.selection}
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
          }}
        >
          <i className="fas fa-trash" />
        </Button>
      </Col>
    </li>
  );
};

export default BasketItem;

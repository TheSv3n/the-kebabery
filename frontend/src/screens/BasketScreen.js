import React from "react";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import BasketItem from "../components/BasketItem";
import PriceSummary from "../components/PriceSummary";
import CheckoutSteps from "../components/CheckoutSteps";
import { useSelector } from "react-redux";

const BasketScreen = ({ history }) => {
  const basket = useSelector((state) => state.basket);
  const { basketItems } = basket;

  const submitHandler = () => {
    history.push("/login?redirect=delivery");
  };

  return (
    <Container>
      <CheckoutSteps step1 step2 />
      <Row>
        <Col md={8}>
          <ListGroup>
            {basketItems.map((meal) => (
              <BasketItem key={meal._id} meal={meal} />
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <PriceSummary />
          <ListGroup.Item>
            <Button
              onClick={submitHandler}
              className="btn-block"
              type="button"
              disabled={basketItems.length === 0}
            >
              Go to Delivery
            </Button>
          </ListGroup.Item>
        </Col>
      </Row>
    </Container>
  );
};

export default BasketScreen;

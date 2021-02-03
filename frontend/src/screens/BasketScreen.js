import React from "react";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import OrderItem from "../components/OrderItem";
import PriceSummary from "../components/PriceSummary";
import { useSelector } from "react-redux";

const BasketScreen = ({ history }) => {
  const basket = useSelector((state) => state.basket);
  const { basketItems } = basket;

  const submitHandler = () => {
    history.push("/login?redirect=delivery");
  };

  return (
    <Container>
      <Row>
        <Col md={8}>
          <ListGroup>
            {basketItems.map((meal) => (
              <OrderItem key={meal._id} meal={meal} />
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

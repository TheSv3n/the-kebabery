import React from "react";
import { Row, Col, Card, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

const PriceSummary = () => {
  const basket = useSelector((state) => state.basket);
  const { basketItems, deliveryCost } = basket;

  const basketTotal = basketItems.reduce(
    (acc, item) => acc + item.totalPrice,
    0
  );

  const orderTotal = basketTotal + deliveryCost;

  return (
    <Card className="my-1">
      <ListGroup>
        <ListGroup.Item>
          <h3>Your Order</h3>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>Items Price:</Col>
            <Col>
              <strong>£{basketTotal.toFixed(2)}</strong>
            </Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>Delivery Cost:</Col>
            <Col>
              <strong>£{deliveryCost.toFixed(2)}</strong>
            </Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>Total:</Col>
            <Col>
              <strong>£{orderTotal.toFixed(2)}</strong>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default PriceSummary;

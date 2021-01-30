import React from "react";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import OrderItem from "../components/OrderItem";
import { useSelector } from "react-redux";

const BasketScreen = () => {
  const basket = useSelector((state) => state.basket);
  const { basketItems } = basket;

  const submitHandler = () => {};

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
          <Card className="my-1">
            <ListGroup>
              <ListGroup.Item>
                <h3>Title</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items Price:</Col>
                  <Col>
                    <strong>£0</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Delivery Cost:</Col>
                  <Col>
                    <strong>£0</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>
                    <strong>£0</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

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
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BasketScreen;

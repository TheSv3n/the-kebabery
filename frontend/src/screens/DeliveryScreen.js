import React, { useState } from "react";
import { Form, Button, Container, Row, Col, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  saveDeliveryAddress,
  updateDeliveryCost,
  updateDeliveryMethod,
} from "../actions/basketActions";
import PriceSummary from "../components/PriceSummary";

const DeliveryScreen = ({ history }) => {
  const basket = useSelector((state) => state.basket);
  const { basketItems, deliveryAddress, deliveryMethod, cookTime } = basket;

  const [address, setAddress] = useState(deliveryAddress.address);
  const [city, setCity] = useState(deliveryAddress.city);
  const [postCode, setPostCode] = useState(deliveryAddress.postCode);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveDeliveryAddress({ address, city, postCode }));
    history.push("/ordersummary");
  };

  const setDeliveryMethod = (method, price) => {
    dispatch(updateDeliveryMethod(method));
    dispatch(updateDeliveryCost(price));
  };

  return (
    <Container className="my-1">
      <Row>
        <Col md={8}>
          <Row>
            <Form>
              <Form.Group>
                <Form.Check
                  type="radio"
                  label="Delivery"
                  id="Delivery"
                  name="deliveryMethod"
                  checked={deliveryMethod === "Delivery"}
                  inline
                  value="Delivery"
                  onChange={(e) => setDeliveryMethod(e.target.value, 2.5)}
                ></Form.Check>

                <Form.Check
                  type="radio"
                  label="Collection"
                  id="Collection"
                  name="deliveryMethod"
                  inline
                  checked={deliveryMethod === "Collection"}
                  value="Collection"
                  onChange={(e) => setDeliveryMethod(e.target.value, 0)}
                ></Form.Check>
              </Form.Group>
            </Form>
          </Row>
          {deliveryMethod === "Collection" ? (
            <>
              <h2>Collection</h2>
              <div>
                Order will be ready for collection from The Kebabery in 20 mins
              </div>
            </>
          ) : (
            <>
              <h2>Delivery</h2>
              <Form>
                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter address"
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="postCode">
                  <Form.Label>Postcode</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter postcode"
                    value={postCode}
                    required
                    onChange={(e) => setPostCode(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Form>
            </>
          )}
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
              Go to Order Summary
            </Button>
          </ListGroup.Item>
        </Col>
      </Row>
    </Container>
  );
};

export default DeliveryScreen;

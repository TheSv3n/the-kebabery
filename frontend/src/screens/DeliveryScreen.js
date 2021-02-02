import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveDeliveryAddress } from "../actions/basketActions";

const DeliveryScreen = ({ history }) => {
  const basket = useSelector((state) => state.basket);
  const { deliveryAddress } = basket;

  const [address, setAddress] = useState(deliveryAddress.address);
  const [city, setCity] = useState(deliveryAddress.city);
  const [postCode, setPostCode] = useState(deliveryAddress.postCode);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveDeliveryAddress({ address, city, postCode }));
    history.push("/payment");
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1>Shipping</h1>
          <Form onSubmit={submitHandler}>
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

            <Button type="submit" variant="primary">
              Continue
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default DeliveryScreen;

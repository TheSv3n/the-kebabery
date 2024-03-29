import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  saveDeliveryAddress,
  updateDeliveryCost,
  updateDeliveryMethod,
  updateDeliveryTime,
} from "../actions/basketActions";
import PriceSummary from "../components/PriceSummary";
import CheckoutSteps from "../components/CheckoutSteps";
import Map from "../components/Map";

const DeliveryScreen = ({ history }) => {
  const basket = useSelector((state) => state.basket);
  const {
    basketItems,
    deliveryAddress,
    deliveryMethod,
    cookTime,
    deliveryTime,
  } = basket;

  const [address, setAddress] = useState(deliveryAddress.address);
  const [city, setCity] = useState(deliveryAddress.city);
  const [postCode, setPostCode] = useState(deliveryAddress.postCode);
  const [currentTime, setTime] = useState(new Date());
  const [interval, setNewInterval] = useState(1);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      (address === undefined ||
        address === "" ||
        city === undefined ||
        city === "" ||
        postCode === undefined ||
        postCode === "") &&
      deliveryMethod === "Delivery"
    ) {
      setError(
        "Please complete all address details for delivery or choose collection"
      );
    } else {
      setError("");
      dispatch(saveDeliveryAddress({ address, city, postCode }));
      history.push("/ordersummary");
    }
  };

  const setDeliveryMethod = (method, price, time) => {
    dispatch(updateDeliveryMethod(method));
    dispatch(updateDeliveryCost(price));
    dispatch(updateDeliveryTime(time));
    setNewInterval(1 * 1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      let completionTime = new Date();
      completionTime.setHours(
        completionTime.getHours(),
        completionTime.getMinutes() + cookTime + deliveryTime
      );
      setTime(completionTime);
      if (interval === 1) {
        setNewInterval(10 * 1000);
      }
    }, interval);
    return () => {
      clearInterval(timer);
    };
  }, [cookTime, deliveryTime, interval, dispatch]);

  return (
    <Container className="my-1">
      <CheckoutSteps step1 step2 step3 />
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
                  onChange={(e) => setDeliveryMethod(e.target.value, 2.5, 15)}
                ></Form.Check>

                <Form.Check
                  type="radio"
                  label="Collection"
                  id="Collection"
                  name="deliveryMethod"
                  inline
                  checked={deliveryMethod === "Collection"}
                  value="Collection"
                  onChange={(e) => setDeliveryMethod(e.target.value, 0, 0)}
                ></Form.Check>
              </Form.Group>
            </Form>
          </Row>
          {deliveryMethod === "Collection" ? (
            <>
              <h2>Collection</h2>
              <div>
                Order will be ready for collection from The Kebabery at{" "}
                {currentTime.toLocaleTimeString().substring(0, 5)}
              </div>
            </>
          ) : (
            <>
              <h2>Delivery</h2>
              <div>
                Order will be delivered from The Kebabery at{" "}
                {currentTime.toLocaleTimeString().substring(0, 5)}
              </div>
              <Map zoomLevel={17} />
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
          <ListGroup.Item>{<div>{error}</div>}</ListGroup.Item>
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

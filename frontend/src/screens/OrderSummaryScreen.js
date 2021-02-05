import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, resetCreatedOrder } from "../actions/orderActions";
import { clearBasketItems } from "../actions/basketActions";
import PriceSummary from "../components/PriceSummary";

const OrderSummaryScreen = ({ history }) => {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket);
  const { basketItems, deliveryAddress, deliveryCost, deliveryMethod } = basket;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  const basketTotal = basketItems.reduce(
    (acc, item) => acc + item.totalPrice,
    0
  );

  const orderTotal = basketTotal + deliveryCost;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch(resetCreatedOrder());
      dispatch(clearBasketItems());
    }
  }, [history, success, order, dispatch]);

  const submitHandler = () => {
    dispatch(
      createOrder({
        orderItems: basket.basketItems,
        deliveryAddress: basket.deliveryAddress,
        deliveryMethod: "test",
        paymentMethod: "paypal",
        itemsPrice: basketTotal,
        deliveryPrice: basket.deliveryPrice,
        totalPrice: orderTotal,
      })
    );
  };
  return (
    <>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>{deliveryMethod}</h2>
              {deliveryMethod === "Collection" ? (
                ""
              ) : (
                <p>
                  <strong>Address: </strong>
                  {deliveryAddress.address}, {deliveryAddress.city},{" "}
                  {deliveryAddress.postCode}
                </p>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {basket.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {basket.basketItems.length === 0 ? (
                <div>Your cart is empty</div>
              ) : (
                <ListGroup variant="flush">
                  {basket.basketItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link
                            to={`/product/${item.product}`}
                            style={{ textDecoration: "none", color: "#111" }}
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>£{item && item.price.toFixed(2)}</Col>
                      </Row>

                      {item.options.map((option) => (
                        <Row className="description">
                          <Col md={2}>
                            {option.name}: {option.option}
                          </Col>
                          <Col></Col>
                          <Col md={4}>£{option.price.toFixed(2)}</Col>
                        </Row>
                      ))}
                      <Row>
                        <Col md={2}>Item Total:</Col>
                        <Col></Col>
                        <Col md={4}>£{item.totalPrice.toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <PriceSummary />
          <ListGroup.Item>{error && <div>{error}</div>}</ListGroup.Item>
          <ListGroup.Item>
            <Button
              onClick={submitHandler}
              className="btn-block"
              type="button"
              disabled={basketItems.length === 0}
            >
              Submit Order
            </Button>
          </ListGroup.Item>
        </Col>
      </Row>
    </>
  );
};

export default OrderSummaryScreen;

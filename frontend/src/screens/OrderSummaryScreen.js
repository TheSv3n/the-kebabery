import React, { useEffect, useState } from "react";
import { Button, Row, Col, ListGroup, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, resetCreatedOrder } from "../actions/orderActions";
import { clearBasketItems, savePaymentMethod } from "../actions/basketActions";
import PriceSummary from "../components/PriceSummary";
import OrderItem from "../components/OrderItem";

const OrderSummaryScreen = ({ history }) => {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket);
  const {
    basketItems,
    deliveryAddress,
    deliveryCost,
    deliveryMethod,
    paymentMethod,
    cookTime,
    deliveryTime,
  } = basket;

  const [currentTime, setTime] = useState(new Date());
  const [interval, setNewInterval] = useState(1);

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
  }, [history, success, order, dispatch, cookTime, deliveryTime, interval]);

  const setPaymentMethod = (method) => {
    dispatch(savePaymentMethod(method));
  };

  const submitHandler = () => {
    dispatch(
      createOrder({
        orderItems: basket.basketItems,
        deliveryAddress: basket.deliveryAddress,
        deliveryMethod: deliveryMethod,
        paymentMethod: paymentMethod,
        itemsPrice: basketTotal,
        deliveryPrice: basket.deliveryCost,
        totalPrice: orderTotal,
        cookTime: cookTime,
        deliveryTime: deliveryTime,
        plannedCompletionTime: currentTime,
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
                <div>
                  Order will be ready for collection from The Kebabery at{" "}
                  {currentTime.toLocaleTimeString().substring(0, 5)}
                </div>
              ) : (
                <>
                  <div>
                    Order will be delivered from The Kebabery at{" "}
                    {currentTime.toLocaleTimeString().substring(0, 5)}
                  </div>
                  <p>
                    <strong>Address: </strong>
                    {deliveryAddress.address}, {deliveryAddress.city},{" "}
                    {deliveryAddress.postCode}
                  </p>
                </>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <Form>
                <Form.Group>
                  <Form.Check
                    type="radio"
                    label="Cash"
                    id="Cash"
                    name="paymentMethod"
                    checked={paymentMethod === "Cash"}
                    inline
                    value="Cash"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>

                  <Form.Check
                    type="radio"
                    label="PayPal"
                    id="Paypal"
                    name="paymentMethod"
                    inline
                    checked={paymentMethod === "PayPal"}
                    value="PayPal"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>
                </Form.Group>
              </Form>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {basket.basketItems.length === 0 ? (
                <div>Your cart is empty</div>
              ) : (
                <ListGroup variant="flush">
                  {basket.basketItems.map((item, index) => (
                    <OrderItem item={item} index={index} />
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

import React from "react";
import { Row, Col, Image, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const OrderItem = ({ item, index }) => {
  return (
    <ListGroup.Item key={index}>
      <Row>
        <Col md={1}>
          <Image src={item.image} alt={item.name} fluid rounded />
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
  );
};

export default OrderItem;

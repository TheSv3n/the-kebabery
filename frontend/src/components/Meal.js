import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Meal = ({ meal }) => {
  return (
    <li className={"list-group-item d-flex text-center my-1 my-md-2 my-lg-2"}>
      <Container>
        <Row>
          <Col>{meal.name}</Col>
          <Col>£{meal.price.toFixed(2)}</Col>
        </Row>
        <Row>
          <Col className="description">{meal.description}</Col>
        </Row>
      </Container>
    </li>
  );
};

export default Meal;

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Meal = ({ meal }) => {
  return (
    <Link
      to={`/meal/${meal._id}`}
      className="menu-link"
      style={{ textDecoration: "none", color: "#111" }}
    >
      <li
        className={
          "list-group-item meal-list-item d-flex text-center my-1 my-md-2 my-lg-2"
        }
      >
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
    </Link>
  );
};

export default Meal;

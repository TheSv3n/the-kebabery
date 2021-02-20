import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer className="nav-item" to="/login">
            <Nav.Link>Sign In</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer className="nav-item" to="/basket">
            <Nav.Link>Basket</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Basket</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer className="nav-item" to="/delivery">
            <Nav.Link>Delivery</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Delivery</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer className="nav-item" to="/ordersummary">
            <Nav.Link>Summary</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Summary</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;

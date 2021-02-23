import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const AdminOptionsSwitch = ({ option }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {option === "orders" ? (
          <Nav.Link disabled>Orders</Nav.Link>
        ) : (
          <LinkContainer className="nav-item" to="/admin/orders">
            <Nav.Link>Orders</Nav.Link>
          </LinkContainer>
        )}
      </Nav.Item>

      <Nav.Item>
        {option === "meals" ? (
          <Nav.Link disabled>Meals</Nav.Link>
        ) : (
          <LinkContainer className="nav-item" to="/admin/meallist">
            <Nav.Link>Meals</Nav.Link>
          </LinkContainer>
        )}
      </Nav.Item>

      <Nav.Item>
        {option === "users" ? (
          <Nav.Link disabled>Users</Nav.Link>
        ) : (
          <LinkContainer className="nav-item" to="/admin/userlist">
            <Nav.Link>Users</Nav.Link>
          </LinkContainer>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default AdminOptionsSwitch;

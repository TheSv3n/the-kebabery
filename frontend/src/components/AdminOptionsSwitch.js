import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const AdminOptionsSwitch = ({ option }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {option === "users" ? (
          <LinkContainer className="nav-item" to="/admin/orders">
            <Nav.Link>Orders</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Orders</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {option === "orders" ? (
          <LinkContainer className="nav-item" to="/admin/userlist">
            <Nav.Link>Users</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Users</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default AdminOptionsSwitch;

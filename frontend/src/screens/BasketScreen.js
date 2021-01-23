import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Meal from "../components/Meal";
import { useSelector } from "react-redux";

const BasketScreen = () => {
  const basket = useSelector((state) => state.basket);
  const { basketItems } = basket;

  return (
    <Container>
      <Row>
        <div className="col-12 mx-auto col-md-12 col-lg-12">
          <ul className="list-group">
            {basketItems.map((meal) => (
              <Meal key={meal._id} meal={meal} />
            ))}
          </ul>
        </div>
      </Row>
    </Container>
  );
};

export default BasketScreen;

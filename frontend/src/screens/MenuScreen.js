import React, { useEffect } from "react";
import { Container, Row, ListGroup, Col, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Meal from "../components/Meal";
import { useDispatch, useSelector } from "react-redux";
import { listMeals } from "../actions/mealActions";
import PriceSummary from "../components/PriceSummary";

const MenuScreen = ({ history }) => {
  const dispatch = useDispatch();

  const mealList = useSelector((state) => state.mealList);
  const { loading, error, meals } = mealList;

  const basket = useSelector((state) => state.basket);
  const { basketItems } = basket;

  const mealCategories = [...new Set(meals.map((meal) => meal.category))];

  useEffect(() => {
    dispatch(listMeals());
  }, [dispatch]);

  const submitHandler = () => {
    history.push("/basket");
  };

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        "Error"
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup className="mt-3">
              {mealCategories.map((category) => (
                <>
                  <Row>
                    <h4 className="">{category}</h4>
                  </Row>
                  {meals.map((meal) => {
                    if (meal.category === category) {
                      return <Meal key={meal._id} meal={meal} />;
                    } else {
                      return "";
                    }
                  })}
                </>
              ))}
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
                Go to Basket
              </Button>
            </ListGroup.Item>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default MenuScreen;

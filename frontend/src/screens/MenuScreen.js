import React, { useEffect } from "react";
import { Container, Row, ListGroup, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Meal from "../components/Meal";
import { useDispatch, useSelector } from "react-redux";
import { listMeals } from "../actions/mealActions";

const MenuScreen = () => {
  const dispatch = useDispatch();

  const mealList = useSelector((state) => state.mealList);
  const { loading, error, meals } = mealList;

  const mealCategories = [...new Set(meals.map((meal) => meal.category))];
  console.log(mealCategories);

  useEffect(() => {
    dispatch(listMeals());
  }, [dispatch]);

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        "Error"
      ) : (
        <Row>
          <Col md={12}>
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
        </Row>
      )}
    </Container>
  );
};

export default MenuScreen;

import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Loader from "../components/Loader";
import Meal from "../components/Meal";
import { useDispatch, useSelector } from "react-redux";
import { listMeals } from "../actions/mealActions";

const MenuScreen = () => {
  const dispatch = useDispatch();

  const mealList = useSelector((state) => state.mealList);
  const { loading, error, meals } = mealList;

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
          <div className="col-12 mx-auto col-md-12 col-lg-12">
            <ul className="list-group">
              {meals.map((meal) => (
                <Meal key={meal._id} meal={meal} />
              ))}
            </ul>
          </div>
        </Row>
      )}
    </Container>
  );
};

export default MenuScreen;

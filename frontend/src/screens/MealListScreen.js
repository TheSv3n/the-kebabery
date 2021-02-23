import React, { useEffect } from "react";
import AdminOptionsSwitch from "../components/AdminOptionsSwitch";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listMeals, deleteMeal, createMeal } from "../actions/mealActions";
import { MEAL_CREATE_RESET } from "../constants/mealConstants";

const MealListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const mealList = useSelector((state) => state.mealList);
  const { loading, error, meals } = mealList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const mealDelete = useSelector((state) => state.mealDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = mealDelete;

  const mealCreate = useSelector((state) => state.mealCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    meal: createdMeal,
  } = mealCreate;

  useEffect(() => {
    dispatch({ type: MEAL_CREATE_RESET });

    if (!userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/meal/${createdMeal._id}/edit`);
    } else {
      dispatch(listMeals());
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdMeal]);

  const createMealHandler = () => {
    dispatch(createMeal());
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteMeal(id));
    }
  };

  return (
    <>
      <AdminOptionsSwitch option="meals" />
      <Row className="align-items-center">
        <Col>
          <h1>Meals</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createMealHandler}>
            <i className="fas fa-plus"></i>Create New Meal
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {meals.map((meal) => (
                <tr key={meal._id}>
                  <td>{meal._id}</td>
                  <td>{meal.name}</td>
                  <td>£{meal && meal.price.toFixed(2)}</td>
                  <td>{meal.category}</td>
                  <td>
                    <LinkContainer to={`/admin/meal/${meal._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(meal._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default MealListScreen;

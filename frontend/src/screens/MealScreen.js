import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listMealDetails } from "../actions/mealActions";
import { addToBasket, updateMealOption } from "../actions/basketActions";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Loader from "../components/Loader";

const MealScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const mealDetails = useSelector((state) => state.mealDetails);
  const { loading, error, meal } = mealDetails;

  const mealOptions = useSelector((state) => state.mealOptions);
  const { selectedOptions, optionsTotal } = mealOptions;

  useEffect(() => {
    dispatch(listMealDetails(match.params.id));
  }, [dispatch, match]);

  const setOption = (id, name, option) => {
    dispatch(
      updateMealOption({
        id: id,
        name: name,
        selection: option.split("-", 2)[0],
        price: parseFloat(option.split("-", 2)[1]),
      })
    );
  };

  const addToBasketHandler = () => {
    dispatch(addToBasket(meal, selectedOptions, optionsTotal));
    history.push("/");
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={meal.image} alt={meal.name} fluid></Image>
            </Col>

            <Col md={6}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{meal.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Description: {meal.description}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>
                          £
                          {meal.price && (meal.price + optionsTotal).toFixed(2)}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {meal.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {meal.options &&
                    meal.options.map((option) => (
                      <ListGroup.Item>
                        <Row>
                          <Col>{option.name}</Col>
                          <Col>
                            <Form.Control
                              as="select"
                              key={option._id}
                              onChange={(e) => {
                                setOption(
                                  option._id,
                                  option.name,
                                  e.target.value
                                );
                              }}
                            >
                              {option.selections.map((selection) => (
                                <option
                                  value={`${selection.name}-${selection.price}`}
                                >
                                  {selection.name} (+ £
                                  {selection.price.toFixed(2)})
                                </option>
                              ))}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}

                  <ListGroup.Item>
                    <Button
                      onClick={addToBasketHandler}
                      className="btn-block"
                      type="button"
                      disabled={meal.countInStock === 0}
                    >
                      Add to Basket
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default MealScreen;

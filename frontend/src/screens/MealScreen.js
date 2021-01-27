import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listMealDetails } from "../actions/mealActions";
import { setMealOption, clearMealOptions } from "../actions/basketActions";
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

  useEffect(() => {
    dispatch(listMealDetails(match.params.id));
    dispatch(clearMealOptions());
  }, [dispatch, match]);

  const setOption = (id, name, option, price) => {
    console.log(id, option, price);
    dispatch(setMealOption({ id: id, name: name, option: option, price: 0 }));
  };

  const addToBasketHandler = () => {
    //Do handler
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <div>Error</div>
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
                        <strong>£{meal.price && meal.price.toFixed(2)}</strong>
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
                                  e.target.value,
                                  e.target.price
                                );
                              }}
                            >
                              {option.options.map((option) => (
                                <option value={option.name}>
                                  {option.name} (+ £{option.price.toFixed(2)})
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

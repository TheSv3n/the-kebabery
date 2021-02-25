import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listMealDetails, updateMeal } from "../actions/mealActions";
import { MEAL_UPDATE_RESET } from "../constants/mealConstants";
import { Container, Row, Col } from "react-bootstrap";

const MealEditScreen = ({ match, history }) => {
  const mealId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const [options, setOptions] = useState([]);
  const [warningInfo, setWarningInfo] = useState([]);

  const dispatch = useDispatch();

  const mealDetails = useSelector((state) => state.mealDetails);
  const { loading, error, meal } = mealDetails;

  const mealUpdate = useSelector((state) => state.mealUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = mealUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: MEAL_UPDATE_RESET });
      history.push("/admin/meallist");
    } else {
      if (!meal.name || meal._id !== mealId) {
        dispatch(listMealDetails(mealId));
      } else {
        setName(meal.name);
        setPrice(meal.price);
        setImage(meal.image);
        setCategory(meal.category);
        setCountInStock(meal.countInStock);
        setDescription(meal.description);
        setOptions(meal.options);
        setWarningInfo(meal.warningInfo);
      }
    }
  }, [dispatch, history, mealId, meal, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateMeal({
        _id: mealId,
        name,
        price,
        image,
        category,
        description,
        countInStock,
        options,
        warningInfo,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    //TODO
  };

  return (
    <>
      <Link to="/admin/meallist" className="btn btn-light my-3">
        Go Back
      </Link>

      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h1>Edit Meal</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    value={price.toFixed(2)}
                    onChange={(e) => setPrice(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="image">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter image url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  ></Form.Control>
                  <Form.File
                    id="image-file"
                    label="Choose File"
                    custom
                    onChange={uploadFileHandler}
                  ></Form.File>
                  {uploading && <Loader />}
                </Form.Group>

                {options.map((option) => {
                  return (
                    <>
                      <strong>{option.name}</strong>
                      {option.selections.map((option) => {
                        return <div>{option.name}</div>;
                      })}
                    </>
                  );
                })}

                <Form.Group controlId="countInStock">
                  <Form.Label>Count in Stock</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Count in Stock"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                  Update
                </Button>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MealEditScreen;

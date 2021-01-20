import React from "react";

const Meal = ({ meal }) => {
  return (
    <li className={"list-group-item d-flex text-center my-1 my-md-2 my-lg-2"}>
      <div className="container-fluid text-center ">{meal.name}</div>{" "}
    </li>
  );
};

export default Meal;

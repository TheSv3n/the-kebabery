import mongoose from "mongoose";

const selectionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
});

const optionGroupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    required: true,
  },
  maxChoices: {
    type: Number,
    required: true,
    default: 0, //0 = unlimited
  },
  selections: [selectionSchema],
});

const warningSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  //Types = allergies, spiciness etc
  type: {
    type: String,
    required: true,
  },
});

const mealSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    options: [optionGroupSchema],
    warningInfo: [warningSchema],
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Meal = mongoose.model("Meal", mealSchema);

export default Meal;

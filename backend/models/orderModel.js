import mongoose from "mongoose";

const itemOptionSchema = mongoose.Schema({
  name: { type: String, required: true },
  selection: { type: String, required: true },
  price: { type: Number, required: true },
});

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        options: [itemOptionSchema],
        optionsPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        meal: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Meal",
        },
      },
    ],
    deliveryAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postCode: { type: String, required: true },
    },
    deliveryMethod: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    deliveryPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    plannedCompletionTime: {
      type: Date,
      required: true,
    },
    //Times in minutes
    cookTime: {
      type: Number,
      required: true,
      default: 0,
    },
    deliveryTime: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;

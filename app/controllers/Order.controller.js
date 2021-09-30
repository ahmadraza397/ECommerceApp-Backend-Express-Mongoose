const Order = require("../model/order.model");

//get all orders
const getOrders = async (req, res) => {
  try {
    const order = await Order.find();
    res.json(order);
  } catch (error) {
    res.json({ message: error });
  }
};

//create order
const createOrder = async (req, res) => {
  //validation;
  if (!req.body.phone) {
    res.status(400).send({
      message: "Category phone number cannot be empty",
    });
  }
  const checkOrder = await Order.findOne({ phone: req.body.phone });
  console.log(checkOrder);
  if (checkOrder) {
    res.status(400).send({
      message: "Order already Exist!",
    });
  } else {
    // creating Order
    const order = new Order({
      phone: req.body.phone,
      street: req.body.street,
      apartment: req.body.apartment,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country,
      activeOrder: req.body.activeOrder,
    });
    // saving order in the database
    order
      .save()
      .then((order) => {
        console.log(order);
        res.status(200).send({
          status: "200",
          message: "Succeed",
          data: order,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error while saving in Database!",
        });
      });
  }
};

//get order by id
const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.orderId);

  if (!order) {
    res.status(500).json({ message: "the order with the given ID not found" });
  }
  res.status(200).send({
    status: "200",
    message: "Success",
    data: order,
  });
};

//update order by id
const updateOrderById = async (req, res) => {
  const orderBeforeUpdate = await Order.find({ _id: req.params.orderId });
  //find order and update with req body
  Order.findByIdAndUpdate(
    req.params.orderId,
    {
      phone: req.body.phone || orderBeforeUpdate.phone,
      street: req.body.street || orderBeforeUpdate.street,
      apartment: req.body.apartment || orderBeforeUpdate.apartment,
      zip: req.body.zip || orderBeforeUpdate.zip,
      city: req.body.city || orderBeforeUpdate.city,
      country: req.body.country || orderBeforeUpdate.country,
      activeOrder: req.body.activeOrder || orderBeforeUpdate.activeOrder,
    },
    { new: true }
  )
    .then((order) => {
      if (!order) {
        res.status(404).send({
          message: "Order not found with id" + req.params.orderId,
        });
      }
      res.send({
        status: "200",
        message: "Updated!",
        data: order,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: "Order not found with id " + req.params.orderId,
        });
      }
      res.status(505).send({
        message: "Error getting Order with id " + req.params.orderId,
      });
    });
};

//delete order by id
const deleteOrderById = async (req, res) => {
  Order.findByIdAndRemove(req.params.orderId)
    .then((order) => {
      if (!order) {
        return res.status(404).send({
          message: "Order not found with id" + req.params.orderId,
        });
      }
      res.send({
        status: "200",
        message: "Order Deleted!",
        data: order,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: "Order not found with id " + req.params.orderId,
        });
      }
      res.status(505).send({
        message: "Error getting Order with id " + req.params.orderId,
      });
    });
};

module.exports = {
  getOrders,
  createOrder,
  getOrderById,
  updateOrderById,
  deleteOrderById,
};

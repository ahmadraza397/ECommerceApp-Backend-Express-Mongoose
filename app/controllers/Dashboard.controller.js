const User = require("../model/Users.model");
const Product = require("../model/Product.model");
const Category = require("../model/Category.model");
const Order = require("../model/order.model");

// display Dashboard
const displayDashboard = async (req, res) => {
  const countUsers = await User.countDocuments();
  const countProducts = await Product.countDocuments();
  const countCategory = await Category.countDocuments();
  const countOrders = await Order.countDocuments();
  const recentOrders = await Order.find({ activeOrder: true });
  res.status(200).send({
    status: "200",
    message: "Success!",
    data: {
      total_Users: countUsers || "No User Found!",
      total_Products: countProducts || "No product Found!",
      total_Categories: countCategory || "No Category Found!",
      total_Orders: countOrders || "No Orders Found!",
    },
    recent_Orders: recentOrders,
  });
};

module.exports = {
  displayDashboard,
};

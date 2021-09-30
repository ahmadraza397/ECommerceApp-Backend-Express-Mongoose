const express = require("express");
const router = express.Router();
const orderMethods = require("../controllers/Order.controller");

//get All orders
router.get("/orders", orderMethods.getOrders);

//get by id
router.get("/orders/:orderId", orderMethods.getOrderById);

//create
router.post("/orders", orderMethods.createOrder);

//update by id
router.put("/orders/:orderId", orderMethods.updateOrderById);

//delete by id
router.delete("/orders/:orderId", orderMethods.deleteOrderById);

module.exports = router;

const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const mongoose = require("mongoose");
swaggerDocument = require("./swagger.json");
const dotenv = require("dotenv");
const cors = require("cors");
const authJwt = require("./app/helpers/jwt");
const errorHandler = require("./app/helpers/error-handler");
require("dotenv/config");

app.use(cors());
app.options("*", cors());

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorHandler);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(require("./app/routes/product.routes"));
app.use(require("./app/routes/category.routes"));
app.use(require("./app/routes/user.routes"));
app.use(require("./app/routes/order.routes"));
app.use(require("./app/routes/reviewsRating.routes"));
app.use(require("./app/routes/dashboard.routes"));

mongoose
  .connect(process.env.MONGO_URl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongoose Connected!");
  })
  .catch((err) => {
    console.log("Not Connected to the DataBase!.", err);
    process.exit();
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is Running in the Port ${process.env.PORT}`);
});

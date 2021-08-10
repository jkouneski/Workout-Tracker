const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// morgan is a middleware log that logs details about requests/responses
app.use(logger("dev"));


mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/workout_tracker',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});

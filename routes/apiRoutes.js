const db = require("../models");

module.exports = (app) => {
  //GET find all workouts
  app.get("/api/workouts", (req, res) => {
    db.Workout.find()
      .then((workouts) => {
        res.json(workouts);
      })
      .catch((err) => {
        console.log("error == ", err);
      });
  });

  //POST add workouts
  app.post("/api/workouts/", (req, res) => {
    db.Workout.create(req.body)
      .then((workouts) => {
        res.json(workouts);
      })
      .catch((err) => {
        console.log("error == ", err);
      });
  });

  //PUT update workout
  app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(
      { _id: req.params.id },
      { $push: { exercises: req.body } }
    )
      .then((workouts) => {
        res.json(workouts);
      })
      .catch((err) => {
        console.log("error == ", err);
      });
  });

  // GET all workouts from stats
  app.get("/api/workouts/range", (req, res) => {
    let currentDate = new Date().toISOString();
    let previousWeek = new Date(
      Date.now() - 7 * 24 * 60 * 60 * 1000
    ).toISOString();
    db.Workout.find({
      day: {
        $gt: previousWeek,
        $lte: currentDate,
      },
    })
      .then((workouts) => {
        res.json(workouts);
      })
      .catch((err) => {
        console.log("error ==", err);
      });
  });
};
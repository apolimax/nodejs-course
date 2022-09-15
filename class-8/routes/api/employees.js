const express = require("express");
const router = express.Router();

const data = {};
data.employees = require("../../data/employees.json");

router
  .route("/")
  .get((req, res) => {
    res.json(data.employees);
  })
  .post((req, res) => {
    const { firstname } = req.body;
    const { lastname } = req.body;

    res.json({
      firstname: firstname,
      lastname: lastname,
    });
  })
  .put((req, res) => {
    const { firstname } = req.body;
    const { lastname } = req.body;

    res.json({
      firstname: firstname,
      lastname: lastname,
    });
  })
  .delete((req, res) => {
    res.json({ id: req.body.id });
  });

router.route("/:id").get((req, res) => {
  res.json({ id: req.params.id });
});

module.exports = router;

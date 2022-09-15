const express = require("express");
const {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
} = require("../../controllers/employeeController");
const router = express.Router();

router
  .route("/")
  .get(getAllEmployees)
  .post(createNewEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);

router.route("/:id").get(getEmployeeById);

module.exports = router;

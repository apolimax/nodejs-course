const express = require("express");
const {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
} = require("../../controllers/employeeController");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/roles_list");
/* const verifyJWT = require("../../middleware/verifyJWT"); */

const router = express.Router();

router
  .route("/")
  /* .get(verifyJWT, getAllEmployees) */ // protected route
  .get(getAllEmployees)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createNewEmployee)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateEmployee)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteEmployee);

router.route("/:id").get(getEmployeeById);

module.exports = router;

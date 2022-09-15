const Employee = require("../model/Employee");

const getAllEmployees = async (req, res) => {
  const EmployeesCollection = await Employee.find({});
  if (!EmployeesCollection)
    return res.status(204).json({ message: "No employees found" });
  res.json(EmployeesCollection);
};

const createNewEmployee = async (req, res) => {
  const { firstname, lastname } = req.body;

  if (!firstname || !lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required." });
  }

  try {
    const result = await Employee.create({
      firstname: firstname,
      lastname: lastname,
    });

    const allEmployees = await Employee.find({});

    console.log({ result });
    res.status(201).json(allEmployees);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: "id parameter is required" });

  const employee = await Employee.findById(id).exec();
  /* const employee = await Employee.findOne({_id: id}).exec(); */

  if (!employee) {
    return res.status(204).json({ message: `Employee of id ${id} not found` });
  }
  if (req.body?.firstname) employee.firstname = req.body.firstname;
  if (req.body?.lastname) employee.lastname = req.body.lastname;

  /* const result = await Employee.replaceOne({ _id: id, employee }); */
  const result = await employee.save();

  const allEmployees = await Employee.find({});
  res.json(allEmployees);
};

const deleteEmployee = async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: "Employee id required" });

  const employee = await Employee.findById(id).exec();

  if (!employee) {
    return res.status(400).json({ message: `Employee of id ${id} not found` });
  }

  await Employee.deleteOne({ _id: id });
  const allEmployees = await Employee.find({});
  res.json(allEmployees);
};

const getEmployeeById = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "Employee id required" });

  const employee = await Employee.findById(id).exec();

  if (!employee) {
    return res.status(400).json({ message: `Employee of id ${id} not found` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
};

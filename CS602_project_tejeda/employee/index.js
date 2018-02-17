const express = require('express');
const router = express.Router();
const employeeModule = require("./employeeModule");

// employees routes

router.get('/', employeeModule.displayEmployees);

router.get('/add', employeeModule.addEmployee);
router.post('/add', employeeModule.saveEmployee);

router.get('/edit/:id', employeeModule.editEmployee);
router.post('/edit/:id', employeeModule.saveAfterEdit);

router.get('/delete/:id', employeeModule.deleteEmployee);

module.exports = router; // exports routes

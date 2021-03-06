const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employee_db'
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("You are now connected to the database");

  startMenu();

});

const logoCli = require('cli-logo'),
    version = 'v' + require('./package.json').version,
    description = require('./package.json').description;
    logoConfig = {
        "name": "* Employee Tracker *",
        "description": description,
        "version": version
    };
 
logoCli.print(logoConfig);

function startMenu() {
  inquirer
    .prompt({
      type: "list",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View departments",
        "View roles",
        "View employees",
        "Update employee role",
        "Exit"
      ],
      message: "What would you like to do?",
      name: "option"
    })
    .then(function (result) {
      console.log("You entered: " + result.option);

      switch (result.option) {
        case "View departments":
          viewDepartment();
          break;
        case "View roles":
          viewRoles();
          break;
        case "View employees":
          viewEmployees();
          break;
        case "Add department":
          addDepartment();
          break;
        case "Add role":
          addRole();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "Update employee role":
          updateEmployee();
          break;
        default:
          quit();
      }
    });
}

//Functions

function addDepartment() {

  inquirer.prompt({
    type: "input",
    message: "Please type the name of the department?",
    name: "departmentName"
  }).then(function (answer) {

    connection.query("INSERT INTO department (name) VALUES (?)", [answer.departmentName], function (err, res) {
      if (err) throw err;
      console.table(res)
      startMenu()
    })
  })
}

function addRole() {
  inquirer
    .prompt([{
        type: "input",
        message: "What is the name of the role?",
        name: "roleNameAdd"
      },
      {
        type: "input",
        message: "Please type the salary for this role?",
        name: "salary"
      },
      {
        type: "input",
        message: "What is the department id number?",
        name: "departmentId"
      }
    ])
    .then(function (answer) {

      connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleNameAdd, answer.salary, answer.departmentId], function (err, res) {
        if (err) throw err;
        console.table(res);
        startMenu();
      });
    });
}

function addEmployee() {
  inquirer
    .prompt([{
        type: "input",
        message: "What's the first name of the employee?",
        name: "employeeFirstName"
      },
      {
        type: "input",
        message: "What's the last name of the employee?",
        name: "employeeLastName"
      },
      {
        type: "input",
        message: "What is the employee's role id number?",
        name: "roleID"
      },
      {
        type: "input",
        message: "What is the manager id number?",
        name: "managerID"
      }
    ])
    .then(function (answer) {

      connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.employeeFirstName, answer.employeeLastName, answer.roleID, answer.managerID], function (err, res) {
        if (err) throw err;
        console.table(res);
        startMenu();
      });
    });
}

function updateEmployee() {
  inquirer
    .prompt([{
        type: "input",
        message: "Which employee would you like to update?",
        name: "employeeUpdate"
      },
      {
        type: "input",
        message: "What do you want to update to?",
        name: "updateRole"
      }
    ])
    .then(function (answer) {
      connection.query('UPDATE employee SET role_id=? WHERE first_name= ?', [answer.updateRole, answer.employeeUpdate], function (err, res) {
        if (err) throw err;
        console.table(res);
        startMenu();
      });
    });
}

function viewDepartment() {
  // select from the db
  let query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startMenu();
  });

}

function viewRoles() {
  // select from the database employee_db
  let query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startMenu();
  });

}

function viewEmployees() {
  // select from the database employee_db
  let query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startMenu();
  });
}

function quit() {
  connection.end();
  process.exit();
}
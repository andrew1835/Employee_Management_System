const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",

    // Your database
    database: "employees_db"
});

// TODO: Figure out if you need to do the 'console.log("connected as id " + connection.threadId)' here. It's done in some activities, but not others. I don't think it changes any functionality. Just might make it easier to read
// The code below connects your file to the sql data
connection.connect(function (err) {
    if (err) throw err;
    runMain();
});

// TODO: Figure out where you put the connection.query("SELECT..."). You can reference many examples to see how this is done
function runMain() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Add Employee",
                "Add Role",
                "Add Department",
                "View All Employees",
                "View All Employees by Department",
                "View All Employees by Role",
                "Update Employee Information",
                "Exit"
            ]
        })
        .then(function (answer) {
            if (answer.action === "Add Employee") {
                addEmployee();
            }
            else if (answer.action === "Add Role") {
                addRole();
            }
            else if (answer.action === "Add Department") {
                addDepartment();
            }
            else if (answer.action === "View All Employees") {
                viewEmployees();
            }
            else if (answer.action === "View All Employees by Department") {
                viewEmployeesByDep();
            }
            else if (answer.action === "View All Employees by Role") {
                viewEmployeesByRole();
            }
            else if (answer.action === "Update Employee Information") {
                updateEmployeeInfo();
            } else {
                connection.end();
            }
        })
}

function addEmployee() {

}

function addRole() {

}

function addDepartment() {

}

function viewEmployees() {

}

function viewEmployeesByDep() {

}

function viewEmployeesByRole() {

}

function updateEmployeeInfo() {

}
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
    // database: INSERT NAME HERE
});

connection.connect(function (err) {
    if (err) throw err;
    runMain();
});

function runMain() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "Add Employee",
                "Add Role",
                "Add Department",
                "View All Employees",
                "View All Employees by Department",
                "View All Employees by Role",
                "Update Employee Information"
            ]
        })
}


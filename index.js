const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

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
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the employee's first name?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the employee's last name?"
            },
            {
                name: "role_ID",
                type: "input",
                message: "What is the employee's role ID?"
            },
            {
                name: "manager_ID",
                type: "input",
                message: "What is the ID of the employee's manager?"
            }
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.role_ID,
                    manager_id: answer.manager_ID
                },
                function (err) {
                    if (err) throw err;
                    console.log("The employee was added successfuly!");
                    // re-prompt the user for if they want to bid or post
                    runMain();
                }
            );
        });
}

function addRole() {
    inquirer
        .prompt([
            {
                name: "roleTitle",
                type: "input",
                message: "What is the role title?"
            },
            {
                name: "roleSalary",
                type: "input",
                message: "What is the role salary?"
            },
            {
                name: "department_ID",
                type: "input",
                message: "What is the ID of the department this role belongs to?"
            }
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: answer.roleTitle,
                    salary: answer.roleSalary,
                    department_id: answer.department_ID
                },
                function (err) {
                    if (err) throw err;
                    console.log("The role was added successfuly!");
                    // re-prompt the user for if they want to bid or post
                    runMain();
                }
            );
        });
}

function addDepartment() {
    inquirer
        .prompt([
            {
                name: "departmentName",
                type: "input",
                message: "What is the name of the department?"
            }
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO departments SET ?",
                {
                    name: answer.departmentName
                },
                function (err) {
                    if (err) throw err;
                    console.log("The department was added successfuly!");
                    // re-prompt the user for if they want to bid or post
                    runMain();
                }
            );
        });
}

function viewEmployees() {
    // Will simply show a table that has all the employees. Just display the employees table.
    console.log("Showing all employees:\n");
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        connection.end();
    });
}

function viewEmployeesByDep() {
    // Will show a joined table that has a column with departments and then another columns that matches the appropiate employees to the departments. Do it so they're all grouped together. For example, you might have a few rows where the department is "Intern" and it has the corresponding employees to the right, and then a few rows after that where the department is "Manager", etc.
    console.log("Showing all employees by department:\n");
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        connection.end();
    });
}

function viewEmployeesByRole() {
    // Will show a joined table similar to the one above, with the only difference being that the right column shows the roles instead of departments
    console.log("Showing all employees by role:\n");
    connection.query("SELECT first_name, last_name, role_id FROM employee JOIN role ON employee.role_id = role.department_id", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        connection.end();
    });
}

function updateEmployeeInfo() {
    // Here you will have an inquirer prompt with a type of list where the choices are all the employees that have been added. You will pull this by referencing the employees that you've added to your MySQL employee table. You can reference activities that utilize the U in CRUD to see how to do this. Can reference lines 97-129 for the part where you show a list of employees in inquirer, and can reference lines 132-150 for how to update (all referencing activity 10)
    // Once they choose an option, they will be prompted by inquirer to update the employees new role and new manager id
    // Not sure if you write the second two questions in the original prompt or in the .then
    connection.query("SELECT * FROM employee", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "chooseEmployee",
                    type: "list",
                    message: "Which employee would you like to update?",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].first_name)
                            // choiceArray.push(results[i].first_name + " " + results[i].last_name)
                            // The code directly above shows the first and last name, but I don't know how to grab that when updating, so I'm just using the first name
                        }
                        return choiceArray
                    }
                },
                {
                    name: "updateRole",
                    type: "input",
                    message: "What is the employee's new role ID?"
                },
                {
                    name: "updateManager",
                    type: "input",
                    message: "What is the ID of the employee's new manager?"
                }
            ]
            )
            .then(function (answer) {
                connection.query(
                    "UPDATE employee SET ? WHERE ?",
                    [
                        {
                            role_id: answer.updateRole,
                            manager_id: answer.updateManager
                        },
                        {
                            first_name: answer.chooseEmployee
                        },
                    ],
                    function (err) {
                        if (err) throw err;
                        console.log("The employee was updated successfuly!");
                        // re-prompt the user for if they want to bid or post
                        runMain();
                    }
                );
            });
    })
}




// Remember, what you're showing when you do console.table will be the data from the sql file. This is important. If you were simply showing the data you input here, then there would be no point to the application because it wouldn't save or update anything. With this app, you're updating the tables in the MySQL file and then doing a console.table of that to show the information from the tables in that MySQL file.


// Your work through line 70 is all good!

// TODO: Ask these questions in office hours:
// How do I update based off both the first and last name, and not just one or the other?
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employees_db'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log(`Connected as id ${connection.threadId}.`)
    start();
});

//Create start function w/ inquirer
function start() {
    inquirer
        .prompt({
            name: 'begin',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                "View departments",
                "View roles",
                "View employees",
                new inquirer.Separator(),
                "Add department",
                "Add role",
                "Add employee",
                "Update employee role",
                new inquirer.Separator(),
                "Exit\n"
            ]
        })
        .then((answer) => {
            switch (answer.begin) {
                case 'View departments':
                    viewDep();
                    break;
                case 'View roles':
                    viewRol();
                    break;
                case 'View employees':
                    viewEmp();
                    break;
                case 'Add department':
                    addDep();
                    break;
                case 'Add role':
                    addRol();
                    break;
                case 'Add employee':
                    addEmp();
                    break;
                case 'Update employee role':
                    updEmp();
                    start();
                    break;
                case 'Exit\n':
                    connection.end();
            };
        })
};

function viewDep() {
    const query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        const table = cTable.getTable(res);
        console.log(table);
        start();
    })
};

function viewRol() {
    const query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        const table = cTable.getTable(res);
        console.log(table);
        start();
    })
};

function viewEmp() {
    const query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        const table = cTable.getTable(res);
        console.log(table);
        start();
    })
};

function addDep() {
    inquirer
        .prompt([
            {
                name: 'name',
                type: 'input',
                message: 'What is the name of the department?'
            }
        ])
        .then((response) => {
            const query = "INSERT INTO department SET ?"
            connection.query(
                query,
                {
                    name: response.name
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("Department successfully added!");
                    start();
                }
            )
        })
};

function addRol() {
    inquirer
        .prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the title of the role?'
            },
            {
                name: 'salary',
                type: 'number',
                message: 'What is the salary for this position?',
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true
                    };
                    return false
                }
            },
            {
                name: 'dept',
                type: 'list',
                message: 'To which department does the role belong?',
                choices: [
                    {
                        value: 1,
                        name: 'Management'
                    },
                    {
                        value: 2,
                        name: 'Accounting'
                    },
                    {
                        value: 3,
                        name: 'Marketing'
                    },
                    {
                        value: 4,
                        name: 'Finance'
                    },
                    {
                        value: 5,
                        name: 'Engineering'
                    }
                ]
            }
        ])
        .then((response) => {
            const query = "INSERT INTO role SET ?"
            connection.query(
                query,
                {
                    title: response.title,
                    salary: response.salary,
                    department_id: response.dept
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("Role successfully added!");
                    start();
                }
            )
        })
};

function addEmp() {
    inquirer 
        .prompt([
            {
                name: 'firstName',
                type: 'input',
                message: 'Please enter employee\'s first name:'
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'Please enter employee\'s last name:'
            },
            {
                name: 'role',
                type: 'list',
                message: 'What is the employee\'s role?',
                choices: [
                    {
                        value: 1, 
                        name: 'President'
                    },
                    {
                        value: 2,
                        name: 'Vice President'
                    },
                    {
                        value: 3,
                        name: 'Executive Secretary'
                    },
                    {
                        value: 4,
                        name: 'Head Accountant'
                    },
                    {
                        value: 5,
                        name: 'Junior Accountant'
                    },
                    {
                        value: 6,
                        name: 'Marketing Manager'
                    },
                    {
                        value: 7,
                        name: 'Content Specialist'
                    },
                    {
                        value: 8,
                        name: 'Head of Investments'
                    },
                    {
                        value: 9,
                        name: 'Financial Analyst'
                    },
                    {
                        value: 10,
                        name: 'Senior Software Engineer'
                    },
                    {
                        value: 11,
                        name: 'Full Stack Developer'
                    }
                ]
            },
            {
                name: 'manager',
                type: 'list',
                message: 'Who is the employee\'s manager?',
                choices: [
                    {
                        value: 1, 
                        name: 'President'
                    },
                    {
                        value: 2,
                        name: 'Vice President'
                    },
                    {
                        value: 3,
                        name: 'Executive Secretary'
                    },
                    {
                        value: 4,
                        name: 'Head Accountant'
                    },
                    {
                        value: 5,
                        name: 'Junior Accountant'
                    },
                    {
                        value: 6,
                        name: 'Marketing Manager'
                    },
                    {
                        value: 7,
                        name: 'Content Specialist'
                    },
                    {
                        value: 8,
                        name: 'Head of Investments'
                    },
                    {
                        value: 9,
                        name: 'Financial Analyst'
                    },
                    {
                        value: 10,
                        name: 'Senior Software Engineer'
                    },
                    {
                        value: 11,
                        name: 'Full Stack Developer'
                    }
                ]
            },
        ])
        .then((response) => {
            const query = "INSERT INTO employee SET ?";
            connection.query(
                query,
                {
                    first_name: response.firstName,
                    last_name: response.lastName,
                    role_id: response.role,
                    manager_id: response.manager
                },
                function (err, res) {
                    if (err) throw err;
                    console.log('Employee successfully added!')
                }
            );
            start();
        })
};
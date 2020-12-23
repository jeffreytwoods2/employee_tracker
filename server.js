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
                    start();
                    break;
                case 'View roles':
                    viewRol();
                    start();
                    break;
                case 'View employees':
                    viewEmp();
                    start();
                    break;
                
                // case 'Add employee':
                //     addEmp();
                //     break;
                // case 'Remove employees':
                //     remove();
                //     break;
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
    })
};

function viewRol() {
    const query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        const table = cTable.getTable(res);
        console.log(table);
    })
};

function viewEmp() {
    const query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        const table = cTable.getTable(res);
        console.log(table);
    })
};

// function addEmp() {
//     inquirer 
//         .prompt([
//             {
//                 name: 'firstName',
//                 type: 'input',
//                 message: 'Please enter first name:'
//             },
//             {
//                 name: 'lastName',
//                 type: 'input',
//                 message: 'PLease enter last name:'
//             },
//             {
//                 name: 'role',
//                 type: 'list',
//             }
//         ])
// }
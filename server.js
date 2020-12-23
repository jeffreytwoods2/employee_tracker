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
                "View all employees",
                "Manage employees",
                "Remove employees",
                "Exit\n"
            ]
        })
        .then((answer) => {
            switch (answer.begin) {
                case 'View all employees':
                    view();
                    start();
                    break;
                // case 'Manage employees':
                //     manage();
                //     break;
                // case 'Remove employees':
                //     remove();
                //     break;
                case 'Exit\n':
                    connection.end();
            };
        })
};

function view() {
    const query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        const table = cTable.getTable(res);
        console.log(table);
    })
};
const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_db'
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
                "Exit"
            ]
        })
        .then((answer) => {
            switch (answer.begin) {
                case 'View all employees':
                    view();
                    break;
                case 'Manage employees':
                    manage();
                    break;
                case 'Remove employees':
                    remove();
                    break;
                case 'Exit':
                    connection.end();
            };
            start();
        })
}
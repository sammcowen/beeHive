const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const { restoreDefaultPrompts } = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// connect to datatbase
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'workplace'
    },
    console.log('you are connected to the workplace  database')
)
function menu() {
    inquirer
        .prompt({

            type: 'list',
            choices: ['View All DEPARTMENTS',
                'View All ROLES',
                'View All EMPLOYEES',
                'ADD a DEPARTMENT ',
                'ADD a ROLE',
                'ADD an EMPLOYEE',
                'UPDATE an EMPLOYEE ROLE'


            ],
            name: 'menu',
            message: "choose one of the following options",


        })
        .then(function (answers) {
            console.log('You chose' + answers.option);
            switch (answers.option) {
                case 'View All DEPARTMENTS':
                    viewDepartments();
                    break;
                case 'View All ROLES':
                    viewRoles();
                    break;
                case 'ADD a DEPARTMENT ':
                    addDepartment();
                    break;
                case 'ADD a ROLE':
                    addRole();
                    break;
                case 'ADD an EMPLOYEE':
                    addEmployee();
                    break;
                    case 'UPDATE an EMPLOYEE ROLE':
                        updateEmployee();
                        break;
                        default:exit();

            }
        });
    }
    menu();

    app.listen(PORT, () => {
        console.log(`you are now on port ${PORT}`);
    });
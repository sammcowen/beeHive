const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// connect to datatbase
const db = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'password',
        database:'workplace'
    },
    console.log('you are connected to the workplace  database')
)
function init() {
    inquirer.prompt({
        
            type: 'list',
            name: 'menu',
            message: "choose one of the following options",
            choices: ['View All DEPARTMENTS',
                'View All ROLES',
                'View All EMPLOYEES',
                'ADD a DEPARTMENT ',
                'ADD a ROLE',
                'ADD an EMPLOYEE',
                'UPDATE an EMPLOYEE ROLE'

                ]
        }
    )}; 

init();

app.listen(PORT, () => {
    console.log(`you are now on port ${PORT}`);
});
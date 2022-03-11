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
        .then(function (data) {
            
            switch (data.menu) {
                case 'View All DEPARTMENTS':
                    viewDepartments();
                    break;
                case 'View All ROLES':
                    viewRoles();
                    break;
                case 'View All EMPLOYEES':
                    viewEmployees();
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
                

            }
        });
}
// functions 
const viewDepartments = () => {
    console.log('Viewing ALL DEPARTMENTS\n');
    let sql = `SELECT * FROM department`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        menu();

    });

}
const viewRoles = () => {
    console.log('Viewing ALL ROLES\n')
    const sql = `SELECT * FROM role`;
    db.query(sql,(err,res)=> {
        if(err) throw err;
        console.table(res);
        menu();
    })
}
const viewEmployees = () => {
    console.log('Viewing ALL EMPLOYEES\n');
    const sql = `SELECT * FROM employee`;
    db.query(sql,(err,res)=> {
        if(err) throw err;
        console.table(res);
        menu();
    })
}
// init app with a menu of selections
menu();

app.listen(PORT, () => {
    console.log(`you are now on port ${PORT}`);
});
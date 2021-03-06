const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');


const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'workplace'
    },
    console.log('you are connected to the workplace  database')
);
// init app with a menu selection
db.connect((err) => {
    if (err) throw err;
    console.log('you are connected to the workplace  database')
    menu();
});
function menu() {
    inquirer
        .prompt([
            {

                type: 'list',
                choices: ['View All DEPARTMENTS',
                    'View All ROLES',
                    'View All EMPLOYEES',
                    'ADD a DEPARTMENT ',
                    'ADD a ROLE',
                    'ADD an EMPLOYEE',
                    'UPDATE an EMPLOYEE ROLE',
                    'Finish'

                ],
                name: 'menu',
                message: "choose one of the following options",


            }
        ])
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
                case 'Finish':
                    finish();
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

    })


};
const viewRoles = () => {
    console.log('Viewing ALL ROLES\n')
    const sql = ` SELECT r.id, r.title, r.salary, d.name AS department
     FROM role r 
     LEFT JOIN department d
     ON r.department_id = d.id;`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        menu();
    })

};
const viewEmployees = () => {
    console.log('You are viewing ALL EMPLOYEES');
    const sql = `SELECT e.id, e.first_name, e.last_name, e.role_id,CONCAT (m.first_name, ' ', m.last_name) AS manager, r.title AS job_title, r.salary AS salary
    FROM employee e         
     LEFT JOIN role r 
     ON e.role_id = r.id
     LEFT JOIN employee m
     ON e.manager_id = m.id
     ;
     `
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        menu();

    })

};
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'dept',
            message: 'Enter the name of the department you wish to add'
        }
    ])
        .then(function (data) {

            db.query(`INSERT INTO department(name) VALUES (?) `, [data.dept], function (err, res) {
                if (err) throw err;
                console.log([data.dept] + ` id  is added to database`);
                menu();
            })


        })

};
const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'empfirstname',
            message: 'What is the employee first name?'
        },
        {
            type: 'input',
            name: 'emplastname',
            message: 'What is employee last name?'
        },
        {
            type: 'input',
            name: 'emprole',
            message: `What is this employee's role id ?`
        }
        ,
        {
            type: 'input',
            name: 'empmanager',
            message: `What is the manager id of this employee?`
        }
    ]).then(function (data) {

        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [data.empfirstname, data.emplastname, data.emprole, data.empmanager], (err, res) => {
            if (err) throw err;
            console.log([data.empfirstname, data.emplastname] + ' has been added to the database as an employee');
            menu();
        })
    })
};
const addRole = () => {
    inquirer.prompt([
        {
            type:'input',
            name:'rolename',
            message:'What is the name of this role?'
        },
        {
            type:'input',
            name:'rolesalary',
            message:'What is the salary for this role?'
            
        },
        {
            type:'input',
            name:'roledept',
            message:'What is the department number for this role?'

        }
       
    ]).then (function(data) {
        db.query(`INSERT INTO role(title, salary, department_id) VALUES(?, ?, ?)`, [data.rolename, data.rolesalary, data.roledept],(err,res) => {
                if(err)throw err;
                console.log([data.rolename] + ` has been added to database as a role`);
                menu();
        })
    })
};
const updateEmployee = () => {
    const sql = `SELECT * FROM employee;`
    db.query(sql,(err,res)=> {
        if(err) throw err;
        console.table('_________________',res);
    })
   
inquirer.prompt([
    {
        type:'input',
        name:'eid',
        message:"Enter the employee ID of the employee youd want to update from the list below "
    },
     
    {
        
        type:'input',
        name:'newrole',
        message:'Enter the role id number for the employee from the following: 1= Teller / 2= Banker/ 3= Lead Teller / 4 = Manager (Must be a # id) ',
      
    }
]).then (function(data) {
    db.query(`UPDATE employee SET role_id = (?) WHERE employee.id = (?)`, [data.newrole, data.eid], (err,res) => {
        if(err) throw err;
        console.log('Employee role has been updated! ');
        menu();
    })
})
}
const finish = () => {
    console.log('Thank you for using BEEHIVE database services!');
    db.end();
    process.exit();
    
};
app.listen(PORT, () => {
    console.log(`you are now on port ${PORT}`);
});
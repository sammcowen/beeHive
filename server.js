const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

function init()  {
    inquirer.prompt([
        {
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
    ]) .then(function(data){
        console.log(data);
    })
}
init();
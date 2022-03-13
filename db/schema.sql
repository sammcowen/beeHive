CREATE TABLE department(
    id INTEGER NOT NULL  AUTO_INCREMENT ,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id INTEGER NOT NULL AUTO_INCREMENT ,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(9,2) ,
    department_id INT  NULL,
     PRIMARY KEY (id)

);

CREATE TABLE employee(
    id INTEGER NOT NULL AUTO_INCREMENT ,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL ,
    PRIMARY KEY (id)
);

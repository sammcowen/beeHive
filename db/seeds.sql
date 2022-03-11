INSERT INTO department(name)
VALUES('Operations'), ('Sales'), ('Management');

INSERT INTO role(title, salary, department_id)
VALUES ('Teller', 30000.00, 1),
        ('Banker', 50000.00, 2),
        ('Lead Teller', 41600.00, 1),
        ('Manager', 80000.00, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Amanda', 'DeSnake', 2, 4),
 ('Jae','DeSloth', 3, 4),
 ('Yamileth', 'Dajackal', 1, 4),
 ('Samm','DeGreat', 4,NULL),
 ('Alex','DeMagnifique', 2, 4),
 ('Faizan', 'DiHound', 1, 4);


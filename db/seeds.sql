INSERT INTO departments (id, name)
VALUES
(001,'Management'),
(002,'Sales'),
(003,'Finance'),
(004,'Marketing'),
(005,'IT Development');

INSERT INTO role (title, salary, department_id)
VALUES
('Manager', 150000, 001),
('Regional Manger', 75000, 001),
('Sales Manager', 68000, 002),
('Sales Senior', 60000, 002),
('Sales Junior', 45000, 002),
('Senoir Accountant Manager', 130000, 003),
('Senoir Accountant', 105000, 003),
('Accountants assistant', 90000, 003),
('Marketing Lead', 88000, 004),
('Marketing Rep', 67000, 004),
('IT Manager', 165000, 005),
('Senior Developer', 155000, 005),
('Junior Developer', 98000, 005);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Nana', 'Ayebia', 1, NULL),
('David', 'Malcolm', 1, NULL),
('Nixon', 'Jefferies', 2, NULL),
('James', 'Bonn', 2, 2),
('Sarah', 'Brady', 2, 2 ),
('Alex', 'Boyd', 3, NULL),
('Emily', 'Clarence', 3, 3),
('Julia', 'Robertson', 3, 3),
('Mark', 'Capp', 4, 4),
('James', 'West', 4, 4),
('Maria', 'Stone', 5, NULL),
('Daniel', 'Caroll', 5, 5)
('Callum', 'Letts', 5, 5);

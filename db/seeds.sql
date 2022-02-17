INSERT INTO department (name)
VALUES 
    ('Sales'),
    ('Customer Service'),
    ('Human Resources');

INSERT INTO postions (title, salary, department_id)
VALUES
    ('Jewelry Consultant', 50000, 1),
    ('Cashier', 50000, 2),
    ('ASM', 60000, 1), 
    ('Store Manger', 80000, 1);

INSERT INTO employee (id, first_name, last_name, postions_id, manager_id)
VALUES  
    (1, 'Sam', 'Dutton', 1, Null), 
    (2, 'Justin', 'Dove', 2, Null), 
    (3, 'Rylee', 'Thomas', 4, Null), 
    (4, 'Wendy', 'Tricket', 3, 3);
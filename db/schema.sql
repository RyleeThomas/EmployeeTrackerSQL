DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS positions;
DROP TABLE IF EXISTS department;

/* Create table for department */
CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

/* Create table for empoyee positions */
CREATE TABLE positions (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER,  
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL 
);

/* Create table for employees, their postions, and their managers */
CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30), 
    last_name VARCHAR(30),
    positions_id INTEGER,
    manager_id INTEGER,
    CONSTRAINT fk_positions FOREIGN KEY (positions_id) REFERENCES positions(id) ON DELETE SET NULL,
    CONSTRAINT fk_employee FOREIGN KEY (manager_id) REFERENCES employee(id)
);

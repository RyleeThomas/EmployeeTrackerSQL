DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS position;
DROP TABLE IF EXISTS employee;


/* createds a department table */
CREATE TABLE department (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

/*Creates a position Table*/
CREATE TABLE position (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary INTEGER,
    department_id INTEGER
);

/* creates a table foundation with the data critieria */
CREATE TABLE employee (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER,
  manager_id BOOLEAN NOT NULL
);

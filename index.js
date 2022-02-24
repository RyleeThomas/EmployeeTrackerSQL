const inquirer = require('inquirer');
const db = require('./db/connection');
require('console.table');

// main menu options
const mainMenu = {
  Department: 'Department Menu',
  Positions: 'Position Menu', 
  Employees: 'Employee Menu',
}

// connects to db & starts prompt on node index.js command
db.connect(err => {
  if (err) throw err;
  console.log(` ============ Connection Successful ============`);
  initPrompt();
});

// inquirer prompts
function initPrompt() {

  console.log(`============ Employee Tracker Main Menu ============`)
  
  inquirer.prompt({
      name: 'init', 
      type: 'list', 
      message: 'Selected: ', 
      choices: [ mainMenu.Department, mainMenu.Positions, mainMenu.Employees ]
  })
  .then(answer => {
        if(answer.init === mainMenu.Department){
          Dprompt();
        } 
        else if(answer.init === mainMenu.Positions){
            Pprompt();
        }
        else if(answer.init === mainMenu.Employees){
            Eprompt();
        }
    })
}

// department menu options
const departmentMenu = {
    all: 'View All Departments',
    add: 'Add Department', 
    delete: 'Delete Department',
    mainMenu: 'Back to Main Menu',
}

//department Prompt for department menu
function Dprompt() {
    let dep = 'department';
    console.log(`============ Department Menu ============`)
    
    inquirer.prompt({
        name: 'init', 
        type: 'list', 
        message: 'Select: ', 
        choices: [ departmentMenu.all, departmentMenu.add, departmentMenu.delete, departmentMenu.mainMenu ]
    })

    .then(answer => {
        if(answer.init === departmentMenu.all){
            console.log(dep);
            viewAll(dep);
        } else if (answer.init === departmentMenu.add) {
            addDep();
        } else if (answer.init === departmentMenu.delete) {
            dlt(dep);
        } else if (answer.init === departmentMenu.mainMenu) {
            exit();
        }
    })
}

// positions menu options
const positionsMenu = {
    all: 'View All Positions',
    add: 'Add Position', 
    delete: 'Delete Position',
    mainMenu: 'Back to Main Menu',
}

//Position Prompt for Position menu
function Pprompt() {
    let dep = 'positions';
    console.log(`============ Position Menu ============`)
    
    inquirer.prompt({
        name: 'init', 
        type: 'list', 
        message: 'Select: ', 
        choices: [ positionsMenu.all, positionsMenu.add, positionsMenu.delete, positionsMenu.mainMenu ]
    })

    .then(answer => { 
        if(answer.init === positionsMenu.all){
            viewAll(dep);
        } else if (answer.init === positionsMenu.add) {
            addPos();
        } else if (answer.init === positionsMenu.delete) {
            dlt(dep);
        } else if (answer.init === positionsMenu.mainMenu) {
            exit();
        }
    })
}

// Employee menu options
const employeeMenu = {
    all: 'View All Employees',
    add: 'Add Employee',
    update: 'Update Employee', 
    delete: 'Delete Employee',
    mainMenu: 'Back to Main Menu',
}

//Employee Prompt for Employee menu
function Eprompt() {
    let dep = 'employee';
    console.log(`============ Employee Menu ============`)
    
    inquirer.prompt({
        name: 'init', 
        type: 'list', 
        message: 'Select: ', 
        choices: [ employeeMenu.all, employeeMenu.add, employeeMenu.update, employeeMenu.delete, employeeMenu.mainMenu ]
    })

    .then(answer => { 
        if(answer.init === employeeMenu.all){
            viewAll(dep);
        } else if (answer.init === employeeMenu.add) {
            addEmp();
        }else if (answer.init === employeeMenu.delete) {
            dlt(dep);
        } else if (answer.init === employeeMenu.mainMenu) {
            exit();
        }
    })
}

//view all from table selected
function viewAll(dep) {
    //veiw all from departments
    if(dep == 'department'){
        const query = `SELECT * FROM department`;

        db.query(query, (err, res) => {
            if (err) throw err; 
            console.log('-- Department Table --');
            console.table(res);
            Dprompt();
        });
        //view all from positions
    } else if(dep == 'positions') {
        query = `SELECT positions.title, positions.id, positions.salary, department.name AS department
            FROM positions
            LEFT JOIN department on positions.department_id = department.id
            ORDER BY positions.id;
        `;
        db.query(query, (err, res) => {
            if (err) throw err; 
            console.log('-- Positions Table --');
            console.table(res);
            Pprompt();
        });
        //view all employees
    } else if(dep == 'employee'){
        query = `SELECT employee.id, employee.first_name, employee.last_name, positions.title, department.name AS 
        department, positions.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM employee
            LEFT JOIN employee manager on manager.id = employee.manager_id
            INNER JOIN positions ON (positions.id = employee.positions_id)
            INNER JOIN department ON (department.id = positions.department_id)
            ORDER BY employee.id;`;
            db.query(query, (err, res) => {
                if (err) throw err; 
                console.log('-- Employee Table --');
                console.table(res);
                Eprompt();
            });
    }
}

//add department
function addDep() {
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'Department Name: '
        }
    ]).then(newD => {
        db.query(`INSERT INTO department SET ?`, 
        {
            name: newD.name
        }, (err, res) => {
            if(err) throw err;
            console.log("-- Department Added --");
            Dprompt();
        })
    })
}

//add position
function addPos () {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'Position Title: '
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Position Salary: '
        },
        {
            name: 'department',
            type: 'input',
            message: 'Department ID: '
        }
    ]).then(newP => {
        db.query(`INSERT INTO positions SET ?`, 
        {
            title: newP.title,
            salary: newP.salary,
            department_id: newP.department
        }, (err, res) => {
            if(err) throw err;
            console.log("-- Department Added --");
            Pprompt();
        })
    });
}
//add employee
function addEmp (){
    inquirer.prompt([
        {
            name: 'first',
            type: 'input',
            message: 'First Name: '
        },
        {
            name: 'last',
            type: 'input',
            message: 'Last name: '
        },
        {
            name: 'position',
            type: 'input',
            message: 'Position ID: ',
        },
        {
            name: 'manager',
            type: 'input',
            message: 'Manager ID: ',
            default: 'None'
        }
    ]).then(newE => {
        let manId;
        if(newE.manager == 'None'){
            manId = null;
        }else {
            manId = newE.manager;
        }
        db.query(`INSERT INTO employee SET ?`, 
        {
            first_name: newE.first,
            last_name: newE.last,
            positions_id: newE.position,
            manager_id: manId
        }, (err, res) => {
            if(err) throw err;
            console.log("-- Employee Added --");
            Eprompt();
        })
    });
}

//delete by Id number in table
function dlt(dep) {
    let table = dep;
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'ID: '
        }
    ])
    .then(id => {
        const query = `DELETE FROM ${table} WHERE id = ${id.name}`;

        db.query(query, (err, res) => {
            if(table == 'department'){
                console.log("-- Department Deleted --");
                Dprompt();
            } else if(table == 'positions'){
                console.log("-- Position Deleted --");
                Pprompt();
            } else if(table == 'employee'){
                console.log("-- Employee Deleted --");
                Eprompt();
            }
        });
    });
}

function exit(){
    initPrompt();
}
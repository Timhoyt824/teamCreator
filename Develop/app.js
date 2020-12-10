const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let validator = require("email-validator");

let employees = [];

let nameValid = name => {
    if (name === "") {
        return "Please enter your name.";
    } return true;
};

let emailValid = email => {
    if (validator.validate(email)) {
        return true;
    } else {
        return "Please enter a valid email."
    }
};

const managerQs = [{
    message: "What is your Manager's name?",
    name: "name",
    validate: nameValid
  },
    {
    message: "What is your Manager's id?",
    name: "id"
  },
    {
    message: "What is your Manager's email address?",
    name: "email",
    validate: emailValid
  },
    {
    message: "What is your Manager's office number?",
    name: "officeNumber"
  },
];

function newTeamMember(){
    inquirer.prompt([{
            type: "list",
            name: "team",
            message: "Which type of team member would you like to add?",
            choices: [
                "Intern",
                "Engineer",
                "None"
            ]
    }]).then(employee => {
        switch (employee.team){
            case "Intern": 
                internQs();
                break;  
            case "Engineer":
                engineerQs();
                break;
            case "None":
                let html = render(employees)
                fs.writeFile(outputPath, html, function(err){
                    if (err){
                        console.log(err);
                    }else{
                        console.log("Success!");
                    };
                });
        }
    })
};

function init() {
    inquirer
  .prompt(managerQs)
  .then(function(data) {
        let manager = new Manager(data.name, data.id, data.email, data.officeNumber);
        employees.push(manager);
        newTeamMember();
    });
};

function internQs(){
    inquirer
  .prompt([{
       message: "What is your intern's name?",
       name: "name",
       validate: nameValid
      },
       {
        message: "What is your intern's id?",
        name: "id"
      },
       {
        message: "What is your intern's email?",
        name: "email",
        validate: emailValid
      },
       {
        message: "What is your intern's school?",
        name: "school"
      },
    ]).then(function(data) {
        let intern = new Intern(data.name, data.id, data.email, data.school);
        employees.push(intern);
        newTeamMember();
        });
};

function engineerQs(){
    inquirer
  .prompt([{
       message: "What is your engineer's name?",
       name: "name",
       validate: nameValid
      },
       {
        message: "What is your engineer's id?",
        name: "id"
      },
       {
        message: "What is your engineer's email?",
        name: "email",
        validate: emailValid
      },
       {
        message: "What is your engineer's GitHub username?",
        name: "github"
      },
    ]).then(function(data) {
        let engineer = new Engineer(data.name, data.id, data.email, data.github);
        employees.push(engineer);
        newTeamMember();
        });
};
  
init();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

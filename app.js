

const inquirer = require('inquirer');
// taking the module fs and saving it into an object fs
//const fs = require('fs'); // filesystem module 
//const { generate } = require('rxjs');

// lets use our generatePage from page-template.js
//const generatePage = require('./src/page-template.js');

//const pageHTML = generatePage(name, github);

// arguments first is the file to be made
// second: html template
// third: callback function to handle any errors as well as success.
//fs.writeFile('./index.html', generatePage(name,github), err => {
    // throw error will stop the execution of code.
 //   if(err) throw err;

 //   console.log('Portfolio complete! Check out the index.html to see the output!');
//});


inquirer
    .prompt([
        {
            type:'input',
            name: 'name',
            message: 'What is your name?'
        }
    ])
    .then(answers => console.log(answers));



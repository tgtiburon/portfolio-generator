

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

const promptUser = () => {
    

     return inquirer.prompt([
        {
            type:'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }


        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username (Required)',
            validate: nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log('Please enter your gitHub Username!');
                    return false;
                }
            }  
        },
        {
            type:'confirm',
            name:'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true

        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({confirmAbout}) => {
                // conditional statement based on answers already
                // given
                if(confirmAbout) {
                    return true;

                } else {
                    return false;
                }
            }
        }
    ]);
    
};

promptProject = portfolioData => {
    // if there's no 'projects' array property, create one

    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }

    console.log(`
    =================
    Add a New Project
    =================
    `);

    return inquirer.prompt([
        {
            type:'input',
            name: 'name',
            message: 'What is the name of your project? (Required)',
            validate: nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log('Please enter your project name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log('Please enter your project description!');
                    return false;
                }
            }  
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices : ['JavaScript', 'HTML', 'CSS', 'ES6', 'JQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub link!');
                    return false;
                }
            }  
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false  
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false  
        }
        // take the project data and put it into the projectData object array
    ]).then(projectData => {
        portfolioData.projects.push(projectData);
        if(projectData.confirmAddProject) {

            // if the users wants to add another project 
            // send portfolioData and run promptProject again
            return promptProject(portfolioData);

        } else {

            // user does not want to run again. 
            return portfolioData;
        }
        
    });


}


promptUser()
    .then(promptProject)
    .then(portfolioData  => {
        console.log(portfolioData);
    });
    
    
    




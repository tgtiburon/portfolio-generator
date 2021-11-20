

const inquirer = require('inquirer');
// taking the module fs and saving it into an object fs
//const fs = require('fs'); // filesystem module 

// Use our own fs functions
//const generateSite = require("./utils/generate-site.js");
// Since we exported an object from generate-site.js we can
// deconstruct that object like this
const {writeFile, copyFile} = require('./utils/generate-site.js');
// lets use our generatePage from page-template.js
const generatePage = require('./src/page-template.js');



const mockData = {

        name: 'Lernantino',
        github: 'lernantino',
        confirmAbout: true,
        about:
          'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.',
        projects: [
          {
            name: 'Run Buddy',
            description:
              'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
            languages: ['HTML', 'CSS'],
            link: 'https://github.com/lernantino/run-buddy',
            feature: true,
            confirmAddProject: true
          },
          {
            name: 'Taskinator',
            description:
              'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
            languages: ['JavaScript', 'HTML', 'CSS'],
            link: 'https://github.com/lernantino/taskinator',
            feature: true,
            confirmAddProject: true
          },
          {
            name: 'Taskmaster Pro',
            description:
              'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
            languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
            link: 'https://github.com/lernantino/taskmaster-pro',
            feature: false,
            confirmAddProject: true
          },
          {
            name: 'Robot Gladiators',
            description:
              'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
            languages: ['JavaScript'],
            link: 'https://github.com/lernantino/robot-gladiators',
            feature: false,
            confirmAddProject: false
          }
        ]
};//end of mockData    DEBUG DEBUG



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



// New promptUser() using promises
promptUser()
    .then(promptProject)
    .then(portfolioData => {
       // return generatePage(portfolioData);
       return generatePage(mockData);

    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse);
        return copyFile();
    })
    .then(copyFileResponse => {
        console.log(copyFileResponse);
    })
    .catch(err => {
        console.log(err);
    });

// DEBUGGING MockData
// old prompt user

// promptUser() 
//    .then(promptProject)
//    .then(portfolioData  => {
   
//         portfolioData = mockData;
//        const pageHTML = generatePage(portfolioData);
      
//         // arguments first is the file to be made
//         // second: html template
//         // third: callback function to handle any errors as well as success.
//         fs.writeFile('./dist/index.html', pageHTML, err => {
//          //    throw error will stop the execution of code.
//            if(err) {
//                console.log(err);
//                return;
//            }

//            console.log('Portfolio complete! Check out the index.html to see the output!');
//            // By place fs.copyFile here we know for sure that fs.writefile was successful
//            fs.copyFile("./src/style.css", "./dist/style.css", err => {
//                if(err) {
//                    console.log(err);
//                    return;
//                }
//                console.log("Style sheet copied successfully!");
//            })
//         });
//    });

    
      
    
    
    




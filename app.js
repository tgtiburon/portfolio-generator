
// taking the module fs and saving it into an object fs
const fs = require('fs'); // filesystem module 

// lets use our generatePage from page-template.js
const generatePage = require('./src/page-template.js');

const profileDataArgs = process.argv.slice(2);

//const name = profileDataArgs[0];
//const github = profileDataArgs[1];

// This line replaces the two above
const [name, github] = profileDataArgs;

//console.log(name, github);



// arguments first is the file to be made
// second: html template
// third: callback function to handle any errors as well as success.
fs.writeFile('./index.html', generatePage(name,github), err => {
    // throw error will stop the execution of code.
    if(err) throw err;

    console.log('Portfolio complete! Check out the index.html to see the output!');
});





//console.log(profileDataArgs);


// const printProfileData = (profileDataArr) => {

//     for (let i = 0; i < profileDataArr.length; i++) {
//         const element = profileDataArr[i];

//         console.log(profileDataArr[i]);
        
//     }


//     console.log("====================");

//     profileDataArr.forEach((profileItem) => {

//         console.log(profileItem);

//     });

//     console.log("====================");


//     profileDataArr.forEach(profileItem=> console.log(profileItem));

   
// }





//printProfileData(profileDataArgs);

// we need the () because we have no parameters.  You can ommit them if there is only 1
// also there is no return because we have only a single statement
//const generatePage = () => 'Name: Jane, Github: janehub';

// template literals
//const generatePage = (userName, githubName) => `Name: ${userName}, Github: ${githubName}`;


// template literals keep returns in layout



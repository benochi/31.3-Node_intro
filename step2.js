/* Copy over your step1.js code to step2.js

Add a new function, webCat. This should take a URL and, using axios, should read the content of that URL and print it to the console.
*/

const fs = require('fs');
const process = require('process');
const axios = require('axios');

/** read file at path and print it out. */

function cat(path) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      console.log(data);
    }
  });
}

cat(process.argv[2]); //arg is [2] because 0 and 1 are node.js executable path and the JS filepath respectively

/* Error: Request failed with status code 404*/

async function webCat(url) {
    try {
        let res = await axios.get(url); //read response and print to console, if success. 
        console.log(res.data);
    }
    catch(err){
        console.error(`Error with ${url}: ${err}.`);
        process.exit(1);
    }
}

/*Modify the code that invoked cat so that,
based on the command-line args, it decides whether the argument is a file path or a URL and calls either cat or webCat, respectively.*/

let path = process.argv[2];

if (path.slice(0, 4) === 'http') { //check path arg for http value
    webCat(path);
  } else {
    cat(path);
  }

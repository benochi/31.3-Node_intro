/*Copy over your step2.js code to step3.js.
Add a feature where, on the command line, you can optionally provide an argument to output to a file instead 
of printing to the console. The argument should look like this: --out output-filename.txt readfile-or-url.
Current features should still work the same: */


const fs = require('fs');
const process = require('process');
const axios = require('axios');

/*ouldn't write /no/dir/new.txt:
  Error: ENOENT: no such file or directory, open '/no/dir/new.txt' */
// --out output-filename.txt readfile-or-url
function handleOutput(text, out) { 
  if (out) { //first check for --out
    fs.writeFile(out, text, 'utf8', function(err) {
      if (err) { //Make sure you handle errors trying to write to the file:
        console.error(`Couldn't write ${out}: ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(text);
  }
}

/** read file at path and print it out. */

function cat(path, out) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      handleOutput(data, out);
    }
  });
}

/** read page at URL and print it out. */

async function webCat(url, out) {
  try {
    let resp = await axios.get(url);
    handleOutput(resp.data, out);
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}

let path;
let out;
//handleterminal input of --out

if (process.argv[2] === '--out') { //if --out follows your script name
  out = process.argv[3]; //filename to write TO
  path = process.argv[4]; //path
} else {
  path = process.argv[2];
}

if (path.slice(0, 4) === 'http') {
  webCat(path, out);
} else {
  cat(path, out);
}
# node-fullwidth-stdout

Format a string for stdout to be the full width of a terminal window

## Usage
```javascript
var fullWidth = require('node-fullwidth-stdout'),
    chalk     = require('chalk');

function printMsg(msg){
  fullWidth
  .formatStr(msg)
  .forEach(function(line){
    console.log(chalk.bgBlue.white(line));
  });
}

// Configure fullWidth
fullWidth.setTabLength(5);
fullWidth.setFillCharacter(" ");    // It's already space by default, but for illustrative purposes

// This will print a line straight across the terminal window.
printMsg();

// Now what if you wanted to start off w/ an actual message?
printMsg('Hello World!');
printMsg('\tHello World!');
printMsg('\tHello World!\n');
printMsg('\tHello World!\n\n\n');

printMsg();
```
Which will output as below:

# <img width="696" src="https://cdn.rawgit.com/netpoetica/node-fullwidth-stdout/master/output.png" alt="example of output">

This little library is intended for use in a situation where, for example, you are using [chalk](https://github.com/sindresorhus/chalk) with a background color to your text, and you want your background color to extend the entire width of your terminal.

I wrote this lib in answer to [this](http://stackoverflow.com/questions/26533620/javascript-escape-sequence-meaning-to-end-of-stdout-or-similar-usage) question on StackOverflow.

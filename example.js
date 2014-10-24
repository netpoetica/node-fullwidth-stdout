var fullWidth = require('./'),
    chalk     = require('chalk');

function printMsg(msg){
  fullWidth
  .formatStr(msg)
  .forEach(function(line){
    console.log(chalk.bgBlue.white(line));
  });
}

// Configure fullWidth
fullWidth.setTabLength(10);
fullWidth.setFillCharacter("*");

// This will print a line straight across the terminal window.
printMsg();

// Now what if you wanted to start off w/ an actual message?
printMsg('Hello World!');
printMsg('\tHello World!');
printMsg('\t\tHello World!');
printMsg('\tHello World!\n');
printMsg('\tHello World!\n\n\n');

printMsg();
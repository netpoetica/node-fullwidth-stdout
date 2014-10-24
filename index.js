var fillCharacter = ' ',
    tabLength = 5;

// Some escape characters need to be changed into spaces in order to
// fill the full width of the terminal screen buffer / columns
var escapeChars = {
  // Functions because we want to make sure we're always processing terminal width correctly.
  '\n': function(){
    var width = process.stdout.columns,
       result = '';

    while(width--){
      result += fillCharacter;
    }

    return result;
  },
  '\t': function(){
    var result = '',
        length = tabLength;

    while(length--){
      result += fillCharacter;
    }

    return result;
  }
};

// Replace 1 character in a string at a specified index with another character
function setCharAt(str,index,chr) {
  return str.substr(0,index) + chr + str.substr(index+1);
}

// Take a string and pad it with spaces to make it as long as the terminal columns
function formatStr(str){
  // Should be able to print a blank line when no string is passed
  str = str || '';

  var length = str.length,
      index,
      charAtIndex,
      replacement;

  for(index = 0; index <= length; index++){

    charAtIndex = str[index];

    if(typeof escapeChars[charAtIndex] === 'function'){

      replacement = escapeChars[charAtIndex]();

      str = setCharAt(str, index, replacement);

      // Restart the loop since we've mutated the msg
      length = str.length;
      index = 0;

    }
  }

  // Now that we've got a quantifiable length of characters in our message
  // let's add enough spaces to the end of the text to reach the end of stdout
  var columnWidth = process.stdout.columns,
      sliceWidth,
      results = [];

  // We need to split this into chunks of columnWidth long strings so we can expand them
  // in the event that the msg.length is longer than 1 or more column widths.
  // Ensure 1 is the minimum, in order to be able to print a blank line
  var totalSlices = Math.max(1, Math.ceil(str.length / columnWidth));

  // Reuse index var
  for(index = 0; index < totalSlices; index++){
    // Reuse replacement var
    replacement = str.slice(index * columnWidth, columnWidth + (index * columnWidth));

    sliceWidth = columnWidth - replacement.length;

    while(sliceWidth > 0){
      replacement += fillCharacter;
      sliceWidth--;
    }

    results.push(replacement);

  }

  return results;

}

function printLines(str){
  formatStr(str).forEach(function(line){
    console.log(line);
  });
}

function setTabLength(n){
  if(typeof n === 'number') tabLength = n;
}
function setFillCharacter(c){
  if(typeof c === 'string' && c.length === 1) fillCharacter = c;
}

exports.setFillCharacter = setFillCharacter;
exports.setTabLength = setTabLength;
exports.formatStr = formatStr;
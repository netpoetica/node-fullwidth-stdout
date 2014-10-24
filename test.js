var fullWidth = require('./');
var assert = require('assert');

function printMsg(msg){
  fullWidth
  .formatStr(msg)
  .forEach(function(line){
    console.log(line);
  });
}

describe('fullWidth', function(){
  var columnWidth = process.stdout.columns;

  it('should output a full line if no input is specified', function(){
    fullWidth
    .formatStr()
    .forEach(function(line){
      assert.equal(columnWidth, line.length);
    });
  });

  it('should output newline as spaces', function(){
    fullWidth
    .formatStr('\n')
    .forEach(function(line){
      assert.equal(line.length, columnWidth);
    });
  });

  it('should output tabs as spaces', function(){
    fullWidth
    .formatStr('\t')
    .forEach(function(line){
      assert.equal(line.length, columnWidth);
    });
  });

  /* not sure how to test this because it breaks out into spaces and uses a full line
  it('should have configurable tab width', function(){
    fullWidth.setTabLength(10);
  });
  */

  it('should fill out two lines when message width is greater than one line', function(){
    var lines = fullWidth.formatStr('\n\n\n\n');
    assert.equal(lines.length, 4);

    var total = 0;
    lines.forEach(function(line){
      total += line.length;
    });

    assert.equal(total, columnWidth * 4);

  });

  it('should have configurable fill character', function(){
    fullWidth.setFillCharacter("*");

    fullWidth
    .formatStr()
    .forEach(function(line){
      assert.equal(line[0], '*');
    });
  });
});
function Calculator() {
    this.prevOperand = '';
    this.curOperand = '';
    this.method = null;
    this.binaryOperator = 'true';
    
    this.updateView = function(char) { 
      if (char == '.' && (this.curOperand.includes('.')  || this.curOperand == '')) // prevent leading '.' and multiple '.'
        return;
      if (Number.isInteger(Number(char)) && this.curOperand[0] == '0' && !this.curOperand.includes('.') ) // prevent leading zeros  
        return;
      if (this.curOperand.length >= 15) 
        return;

      if (this.curOperand.length > 0) {

          this.prevOperand = '';
      }
      
      this.curOperand += char;
      expressionNode.textContent += char;  
    };
    
    this.operator = function(func) {
      if(this.curOperand == '')
        return;
  
      this.binaryOperator = true;
  
      if(event.target.value == '!') {
        this.binaryOperator = false;
      }
      if(this.prevOperand != '') {
        if(this.binaryOperator)
          this.operate();
        else { // unary operator handler ...
          this.operate();
          this.method = this[func]();
          this.prevOperand = this.curOperand;
          this.curOperand = '';
          expressionNode.textContent += event.target.value;
          this.operateUn();
          return;
        }
      }
  
      this.prevOperand = this.curOperand;
      this.curOperand = '';
  
      expressionNode.textContent += event.target.value;
      this.method = this[func](); // func = event.target.name
    }
  
    this.operate = function() {
        if (this.curOperand == '' || this.prevOperand == '') {
            return;
        }
        const cur = Number(this.curOperand);
        const prev = Number(this.prevOperand);

        let res = this.method(prev,cur);
        if (res.toString().length >= 15) {
            res = res.toPrecision(5);
        }

        this.curOperand = `${res}`;
        this.prevOperand = '';
        this.method = null;
        resultNode.textContent = ` = ${res}`;
    }


    this.operateUn = function() {
        const prev = Number(this.prevOperand);
        const res = this.method(prev);
        this.curOperand = `${res}`;
        this.prevOperand = '';
        this.method = null;
        resultNode.textContent = ` = ${res}`;
    }

    //curoperand seems to be everything on the left building

    this.updateResult = function() {
        if (this.curOperand == '') {
            return;
        }
        expressionNode.textContent = this.curOperand;
    }

    this.clear = function() {
        this.prevOperand = '';
        this.curOperand = '';
        expressionNode.textContent = '';
        resultNode.textContent = '= 0';
        this.method = null;
    }

    this.backspace = function() {
        if(this.curOperand == '' || expressionNode.textContent == '')
          return;
        this.curOperand = this.curOperand.slice(0, -1);
        expressionNode.textContent = expressionNode.textContent.slice(0, -1);
      }
    

    this.negativeSwitch = function () {
        if (this.curOperand != '' || this.curOperand == "-") {
            return;
        }
        this.curOperand += '-';
        if (this.prevOperand != '') {
            expressionNode.textContent += ' ';
        }
        expressionNode.textContent += '-';
    }

    this.sum = function () {
        return function(a,b) {
            return a+b;
        }
    }

    this.div = function () {
        return function(a, b) {
        return a / b;
        }
    }

    this.sub = function () {
        return function(a, b) {
        return a - b;
        }
    }

    this.mul = function() {
    return function (a, b) {
        return a * b; 
    }
    }

}



let calc = new Calculator();

const digits = document.querySelectorAll(".digits");
const operators = document.querySelectorAll(".operators");
const resultNode = document.querySelector('.result');
const expressionNode = document.querySelector('.expression');
const equalNode = document.querySelector('.equal');
const clearNode = document.querySelector('.clear');
const backspaceNode = document.querySelector('.backspace');
const negativeSwitchNode = document.querySelector('.negative');

//getting the # nodes
for (const digitsElem of digits) {
    digitsElem.addEventListener('click', () => calc.updateView(digitsElem.value));
}
for (const operatorsElem of operators) {
    operatorsElem.addEventListener('click', () => calc.operator(operatorsElem.name));
}

equalNode.addEventListener('click', () => {
    if (calc.binaryOperator)
        calc.operate();
    else   
        calc.operateUn();
    calc.updateResult();
});

negativeSwitchNode.addEventListener('click', () => {calc.negativeSwitch();});
clearNode.addEventListener('click', () => calc.clear());
backspaceNode.addEventListener('click', () => calc.backspace());
//Top line, user's inpput



/*
decodeMorse = function(morseCode){
    //This split will make array with number of words
    let arrWord = morseCode.split("   ");
    //count instance of "   ", that's the length
    let arrLetter = []; //arrWord[0].split(" ");
    let tempArr = []
    for (let i = 0; i < arrWord.length; i++) {
        console.log(arrWord.length + " " + arrWord[i]);
        
        tempArray = arrWord[i].split(" ");
        console.log(tempArray);
        arrLetter.push(tempArray);

    }
    //push elements onto new array that are split on space for words
    //console.log("letter" + arrLetter.length + " " + arrLetter[0] + " " + arrLetter[1]);
    console.log("arrWord " + arrWord);
    console.log("tempArray " + tempArray);
    console.log("arrLetter" + arrLetter[0]);
  }

  decodeMorse('.... . -.--   .--- ..-   -.. .');
*/


//line 69 :)


const formEl = document.getElementById("form");
const outputEl = document.getElementById("output");
const inputEl = document.getElementById("input");
const historyEl = document.getElementById("history");
const startEquationEl = document.getElementById("startEquation");
const endEquationEl = document.getElementById("endEquation");


function inToPostConverter(input) {
  // Stack for operators
  const operators = [];
  // String builder for postfix output
  let output = '';
  
  // Tokenize infix expression (split by whitespace)
  const tokens = input.trim().split(/\s+/);
  for (const token of tokens) {
    if (isOperator(token)) {
      // Pop operators of higher or equal precedence and append to output
      while (
        operators.length > 0 &&
        operators[operators.length - 1] !== '(' &&
        precedence(token) <= precedence(operators[operators.length - 1])
      ) {
        output += operators.pop() + ' ';
      }
      // Push the new operator
      operators.push(token);
    } 
    else if (token === '(') {
      operators.push(token);
    } 
    else if (token === ')') {
      // Pop until matching '('
      while (operators.length > 0 && operators[operators.length - 1] !== '(') {
        output += operators.pop() + ' ';
      }
      // Discard the '('
      operators.pop();
    } 
    else {
      // Operand — add directly to output
      output += token + ' ';
    }
  }
  // Pop remaining operators
  while (operators.length > 0) {
    output += operators.pop() + ' ';
  }
  // Return final postfix string
  output = output.trim();
  outputEl.textContent = output
  return output;
}




function inToPreConverter(input) {
  // Stack for operators
  const operators = [];
  // String builder for prefix output
  let output = '';
  // Tokenize infix expression (split by whitespace)
  // notice reverse
  let tokens = input.trim().split(/\s+/).reverse();
  for (const token of tokens) {
    if (isOperator(token)) {
      // Pop operators of higher or equal precedence and append to output
      while (
        operators.length > 0 &&
        operators[operators.length - 1] !== ')' &&
        precedence(token) < precedence(operators[operators.length - 1])
      ) {
        output += operators.pop() + ' ';
      }
      // Push the new operator
      operators.push(token);
    } 
    else if (token === ')') {
      operators.push(token);
    } 
    else if (token === '(') {
      // Pop until matching ')'
      while (operators.length > 0 && operators[operators.length - 1] !== ')') {
        output += operators.pop() + ' ';
      }
      // Discard the ')'
      operators.pop();
    } 
    else {
      // Operand — add directly to output
      output += token + ' ';
    }
  }
  // Pop remaining operators
  while (operators.length > 0) {
    output += operators.pop() + ' ';
  }
 // trims excess white space at beginning and end
 // splits characters into array at the white space
 // reverse the array
 // join the array elements back into single string with space inbetween each element
 output = output.trim().split(/\s+/).reverse().join(" ");
 outputEl.textContent = output;
 return output;
}




function postToInConverter(input) {
  const stack = [];
  const tokens = input.trim().split(/\s+/);
  for (const token of tokens) {
    if (isOperator(token)) {
      const right = stack.pop();
      const left = stack.pop();
      const expression = "( " + left + " " + token + " " + right + " )";
      stack.push(expression);
    }
    // operand
    else {
      stack.push(token)
    }
  }
  let output = removeExtraParentheses(stack.pop());
  outputEl.textContent = output;
  return output;
}





function preToInConverter(input) {
  const stack = [];
  const tokens = input.trim().split(/\s+/).reverse();
  for (const token of tokens) {
    if (isOperator(token)) {
      const left = stack.pop();
      const right = stack.pop();
      const expression = "( " + left + " " + token + " " + right + " )";
      stack.push(expression);
    }
    // operand
    else {
      stack.push(token)
    }
  }
  let output = removeExtraParentheses(stack.pop());
  outputEl.textContent = output;
  return output;
}



// formEl.addEventListener("submit", e => {
//   e.preventDefault();
//   const input = inputEl.value;
//   const start = startEquationEl.value;
//   const end = endEquationEl.value;
//   if (start === "infix" && end === "postfix") {
//     const output = inToPostConverter(input);
//     addToHistory(input, output);
//   }
//   else if (start === "infix" && end === "prefix") {
//     const output = inToPreConverter(input);
//     addToHistory(input, output);
//   }
//   else if (start === "postfix" && end === "infix") {
//     const output = postToInConverter(input);
//     addToHistory(input, output);
//   }
//   else if (start === "postfix" && end === "prefix") {
//     const output = postToInConverter(input);
//     const output2 = inToPreConverter(output);
//     addToHistory(input, output2);
//   }
//   else if (start === "prefix" && end === "infix") {
//     const output = preToInConverter(input);
//     addToHistory(input, output);
//   }
//   else if (start === "prefix" && end === "postfix") {
//     const output = preToInConverter(input);
//     const output2 = inToPostConverter(output);
//     addToHistory(input, output2);
//   }
// });
/* 
  so im gonna try to get whatever the input is, convert to postfix, 
  then build a literally binary tree with that postfix, then use dom 
  manipulation to disaplay the actual tree diagram to the user on the 
  screen. Sounds a bit advnaced though 
*/

// could also build the table that other websites do
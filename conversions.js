const formEl = document.getElementById("form");
const outputEl = document.getElementById("output");
const inputEl = document.getElementById("input");
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
  return output;
}



formEl.addEventListener("submit", e => {
  e.preventDefault();
  const input = inputEl.value;
  const start = startEquationEl.value;
  const end = endEquationEl.value;
  let output;
  
  if (start === "infix" && end === "postfix") {
    output = inToPostConverter(input);
    if (createTree(output) === "error") return;
  }
  else if (start === "infix" && end === "prefix") {
    output = inToPostConverter(input);
    if (createTree(output) === "error") return;
    output = inToPreConverter(input);
  }
  else if (start === "postfix" && end === "infix") {
    if (createTree(input) === "error") return;
    output = postToInConverter(input);
  }
  else if (start === "postfix" && end === "prefix") {
    if (createTree(input) === "error") return;
    output = postToInConverter(input);
    output = inToPreConverter(output);
  }
  else if (start === "prefix" && end === "infix") {
    output = preToInConverter(input);
    const output2 = inToPostConverter(output);
    if (createTree(output2) === "error") return;
  }
  else if (start === "prefix" && end === "postfix") {
    output = preToInConverter(input);
    output = inToPostConverter(output);
    if (createTree(output) === "error") return;
  }

  outputEl.textContent = output;
  if (start !== end)  {
    addToHistory(input, output, start, end);
  }
});  

// POSSIBLE IMPROVEMENT: could make each conversion function check for invalid expression rather then createTree

// could also build the table that other websites do
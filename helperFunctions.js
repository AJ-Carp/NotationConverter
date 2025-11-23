function isOperator(token) {
  return token === '+' || token === '-' || token === '*' || token === '/';
}

function precedence(operator) {
  if (operator === '+' || operator === '-') return 1;
  else return 2; // * or /
}

function addToHistory(input, output) {
  const set = document.createElement("div");
  set.classList.add("set");
  const inEquation = document.createElement("p");
  inEquation.textContent = input;
  const outEquation = document.createElement("p");
  outEquation.textContent = output;
  set.appendChild(inEquation);
  set.appendChild(outEquation);
  historyEl.appendChild(set);
}

function removeExtraParentheses(output) {
  output = output.split(" ");
  // remove first parenthesis
  output.shift();
  // remove last parenthesis
  output.pop();
  return output.join(" ");
}


// LEARN CODE FROM SAMPLE.HTML AND INCORPORATE HERE
const treeContainer = document.getElementById("tree");

function createTree(expression) {
  const stack = [];
  const tokens = expression.trim().split(/\s+/);

  for (const token of tokens) {
    if (isOperator(token)) {
      // right and left are already DOM subtrees now
      const right = stack.pop();
      const left = stack.pop();

      // const rightLine = document.createElement("span");
      // const leftLine = document.createElement("span");
      // rightLine.classList.add("rightLine");
      // leftLine.classList.add("leftLine");
      // right.appendChild(rightLine);
      // left.appendChild(leftLine);

      const parent = document.createElement("div");
      parent.classList.add("tree-node");

      const label = document.createElement("div");
      label.classList.add("tree-label");
      label.textContent = token;

      const operatorLine = document.createElement("span");     
      operatorLine.classList.add("operatorLine");
      label.appendChild(operatorLine);

      const children = document.createElement("div");
      children.classList.add("tree-children");
      children.appendChild(left);
      children.appendChild(right);

      const horizontalLine = document.createElement("span");     
      horizontalLine.classList.add("horizontalLine");
      children.appendChild(horizontalLine);

      parent.appendChild(label);
      parent.appendChild(children);

      stack.push(parent);
    } else {
      // operand → leaf node
      const leaf = document.createElement("div");
      leaf.classList.add("tree-node");

      const label = document.createElement("div");
      label.classList.add("tree-label");
      label.textContent = token;

      const operandLine = document.createElement("span");     
      operandLine.classList.add("operandLine");
      label.appendChild(operandLine);

      leaf.appendChild(label);
      stack.push(leaf);
    }
  }

  const root = stack.pop();
  treeContainer.innerHTML = "";     // clear old tree
  treeContainer.appendChild(root);  // show new tree
}


createTree("A B C - D E + * +");
// A + (B - C) * (D + E)
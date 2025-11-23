function isOperator(token) {
  return ["+", "-", "*", "/"].includes(token);
}

function precedence(operator) {
  if (operator === '+' || operator === '-') return 1;
  else return 2; // * or /
}

function addToHistory(input, output, start, end) {
  const set = document.createElement("div");
  const removeEntry = document.createElement("button");
  removeEntry.textContent = "X";
  removeEntry.classList.add("removeEntry");
  set.appendChild(removeEntry);
  set.classList.add("set");
  const equations = document.createElement("div");
  const inEquation = document.createElement("p");
  inEquation.textContent = `${start}: ${input}`;
  const outEquation = document.createElement("p");
  outEquation.textContent = `${end}: ${output}`;
  equations.appendChild(inEquation);
  equations.appendChild(outEquation);
  set.appendChild(equations);
  historyContainerEl.appendChild(set);
}

const historyEl = document.getElementById("history");
const historyContainerEl = document.getElementById("historyContainer");
historyEl.addEventListener("click", e => {
  const button = e.target;
  if (button.classList.contains("removeEntry")) {
    historyContainerEl.removeChild(button.parentElement);
  }
  else if (button.classList.contains("clearHistory")) {
    historyContainerEl.innerHTML = "";
  }
});



function removeExtraParentheses(output) {
  output = output.split(" ");
  // remove first parenthesis
  output.shift();
  // remove last parenthesis
  output.pop();
  return output.join(" ");
}






const treeContainer = document.getElementById("tree");
const treeWrapper = document.getElementById("tree-wrapper");
const svg = document.getElementById("tree-lines");

function createTree(expression) {
  const stack = [];
  const tokens = expression.trim().split(/\s+/);

  // ("" and " ") get trimmed to "" which is falsy, so !"" is truthy
  // so this if block executes when string is empty or only white space
  if (!expression.trim()) {
    treeContainer.innerHTML = "";
    clearLines();
    return "error";
  }

  for (const token of tokens) {
    if (isOperator(token)) {
      const right = stack.pop();
      const left = stack.pop();

      // if left or right are null or undefined
      if (!left || !right) {
        console.error("Invalid postfix expression");
        return "error";
      }

      const parent = document.createElement("div");
      parent.classList.add("tree-node");

      const label = document.createElement("div");
      label.classList.add("tree-label");
      label.textContent = token;

      const children = document.createElement("div");
      children.classList.add("tree-children");
      children.appendChild(left);
      children.appendChild(right);

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

      leaf.appendChild(label);
      stack.push(leaf);
    }
  }

  const root = stack.pop();
  if (stack.length !== 0) {
    console.error("Invalid postfix expression");
    return "error";
  }

  treeContainer.innerHTML = "";
  treeContainer.appendChild(root);

  // Defer drawing lines until layout is done
  // eliminates risk of lines being drawn in wrong places
  window.requestAnimationFrame(drawTreeLines);
}

// removes connector lines
function clearLines() {
  while (svg.firstChild) svg.removeChild(svg.firstChild);
}

function drawTreeLines() {
  clearLines();

  // set svg to have same dimensions as treeWrapper
  const wrapperRect = treeWrapper.getBoundingClientRect();
  svg.setAttribute("width", wrapperRect.width);
  svg.setAttribute("height", wrapperRect.height);

  // parents contains array of all elements with class .tree-node
  const parents = treeContainer.querySelectorAll(".tree-node");

  // enhanced for loop
  parents.forEach((parent) => {
    // looking for direct children inside the current parent with the class tree-children
    const childrenContainer = parent.querySelector(":scope > .tree-children");

    // if empty, goes to next iteration. Remember we are inside an arrow function
    if (!childrenContainer) return;

    const parentLabel = parent.querySelector(":scope > .tree-label");
    if (!parentLabel) return;

    const parentRect = parentLabel.getBoundingClientRect();
    // horizontal distance from left edge of wrapper to center of label
    const parentX = parentRect.left + parentRect.width / 2 - wrapperRect.left;

    // vertical distance from the TOP EDGE of the wrapper to the BOTTOM of the parent label.
    const parentY = parentRect.bottom - wrapperRect.top;

    const childNodes = childrenContainer.querySelectorAll(":scope > .tree-node");
    childNodes.forEach((child) => {
      const childLabel = child.querySelector(":scope > .tree-label");
      if (!childLabel) return;

      const childRect = childLabel.getBoundingClientRect();
      // horizontal distance from left edge of wrapper to center of label
      const childX = childRect.left + childRect.width / 2 - wrapperRect.left;
      // vertical distance from the TOP EDGE of the wrapper to the top of the child label.
      const childY = childRect.top - wrapperRect.top;

      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      /* so this: line.setAttribute("y1", parentY); line.setAttribute("x1", parentX); is like saying 
         postition one end point of the line at x1 distance away from 
         the left of the svg and y1 distance away from the top of the svg whereever the lines 
         meet will be one of our coordinates */
      line.setAttribute("y1", parentY);               
      line.setAttribute("x1", parentX);
      line.setAttribute("y1", parentY);
      line.setAttribute("x2", childX);
      line.setAttribute("y2", childY);
      line.setAttribute("stroke", "black");
      line.setAttribute("stroke-width", "2");
      svg.appendChild(line);
    });
  });
}

// Redraw lines if window resizes
window.addEventListener("resize", () => {
  // firstChild is first element or text node listed vertically
  if (treeContainer.firstChild) {
    requestAnimationFrame(drawTreeLines);
  }
});

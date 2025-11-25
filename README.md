# Expression Notation Converter & Binary Tree Visualizer

View [Here!](https://aj-carp.github.io/NotationConverter/)

This project is a web tool that converts mathematical expressions between **infix**, **postfix**, and **prefix** notation. It also generates a **binary expression tree** to help users visualize how these expressions are structured and evaluated. The goal is to give Computer Science students and anyone learning data structures a clearer way to practice and understand expression parsing.

---

## 🧠 What the Notations Mean

### **Infix Notation**
This is the standard way humans write math expressions.

Example: ( 60 / ( 4 - 2 ) ) * 3

The operator appears **between** two operands.  
Infix requires parentheses and order-of-operations rules.

---

### **Postfix Notation (Reverse Polish Notation)**
In postfix, the operator comes **after** the operands.

Example: 60 4 2 - / 3 *

Features:
- No parentheses needed  
- Evaluated easily using a stack  
- Used by compilers and some calculators  

---

### **Prefix Notation (Polish Notation)**
In prefix, the operator comes **before** the operands.

Example: * / 60 - 4 2 3

Features:
- No parentheses  
- Easy to evaluate recursively  
- Frequently used in expression parsing theory  

---

## 🔄 How the Converter Works

There are six possible conversions between the three notations.  
Instead of writing six separate algorithms, this project uses **infix as a universal intermediary**.

For example: Prefix → Infix → Postfix

This allows the tool to stay consistent and avoids repeating logic.

---

## 🌳 Binary Expression Tree Visualization

The tool also builds a **binary expression tree** based on the postfix form of the input.

- Each operator becomes an internal node  
- Each operand becomes a leaf  
- The structure shows how the expression is grouped and evaluated  

The tree is drawn using HTML, CSS, and SVG.  
Lines between nodes are positioned dynamically using `getBoundingClientRect()` to compute exact coordinates.

---

## 💻 Technologies Used

- **HTML** for structure  
- **CSS** for styling and layout  
- **JavaScript** for parsing and converting notation  
- **Stacks** for prefix/postfix processing  
- **SVG** for drawing connector lines between tree nodes  

---

## 📘 Example Input Format

Enter spaces between each operand, operator, or parenthesis, e.g.: ( 60 / ( 4 - 2 ) ) * 3

---

## 📚 What I Learned

Working on this project taught me how to:

- Rebuild expression trees using stack-based logic  
- Convert coordinates between DOM elements and SVG  
- Design reusable algorithms for multiple conversion paths  
- Break down a complex problem into smaller, testable parts  
- Handle dynamic page layout and redraw logic  

---

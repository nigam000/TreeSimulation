import { add, remove } from './algorithm/rbtree';
import { Tree } from './classes/tree';
require('./styles.css');

const addForm = document.forms.insertform;
const delForm = document.forms.deleteform;
const inputForAdd = addForm.elements.numberadd;
const btnAdd = addForm.elements.insert;
const inputForDel = delForm.elements.numberdel;
const btnDel = delForm.elements.del;

let list = null;
let tree = {};

function handlerAdd(e) {
  e.preventDefault();
  const n = inputForAdd.value;
  if (n.search(/^\d{1,6}$/) === -1) {
    const message = document.querySelector('.message');
    message.textContent = 'You must enter only numbers';
    setTimeout(() => message.textContent = '', 1000);
    inputForAdd.value = '';
    return;
  }
  list = add(list, parseInt(n, 10));
  inputForAdd.value = '';
  for (const row of document.querySelectorAll('.row')) {
    row.innerHTML = '';
  }
  tree = new Tree(list);
  tree.draw();
}

function handlerDel(e) {
  e.preventDefault();
  const n = inputForDel.value;
  if (n.search(/^\d{1,6}$/) === -1) {
    const message = document.querySelector('.message');
    message.textContent = 'You must enter only numbers';
    setTimeout(() => message.textContent = '', 1000);
    inputForDel.value = '';
    return;
  }
  list = remove(list, parseInt(n, 10));
  inputForDel.value = '';
  for (const row of document.querySelectorAll('.row')) {
    row.innerHTML = '';
  }
  tree = new Tree(list);
  tree.draw();
}

btnAdd.addEventListener('click', handlerAdd);

addForm.addEventListener('submit', handlerAdd);

btnDel.addEventListener('click', handlerDel);

delForm.addEventListener('submit', handlerDel);

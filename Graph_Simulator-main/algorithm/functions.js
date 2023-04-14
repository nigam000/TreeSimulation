import { LEFT, RIGHT } from './constants';

const cloneTree = tree => {
  const newTree = {};
  Object.keys(tree).forEach(key => {
    if (tree[key] && typeof tree[key] === 'object') {
      if (tree === tree[key].parent) {
        newTree[key] = tree[key];
        newTree[key].parent = newTree;
      } else newTree[key] = cloneTree(tree[key]);
    } else {
      newTree[key] = tree[key];
    }
  });
  return newTree;
};

const getGrandFather = node => {
  const { parent } = node;
  const { parent: grandFather } = parent;
  return grandFather;
};

const getUncle = node => {
  const grandFather = getGrandFather(node);
  const { parent } = node;
  if (!grandFather) return null;
  return parent === grandFather.left ? grandFather.right : grandFather.left;
};

const getSibling = node => {
  const { parent } = node;
  if (parent.left) return parent.left;
  return parent.right;
};

const rotate = (node, direction) => {
  const another = direction === LEFT ? RIGHT : LEFT;
  const { parent } = node;
  const grandFather = getGrandFather(node);
  const temp = node[direction];
  node.parent = grandFather;
  if (grandFather) {
    const sideGrandfather = grandFather.left === parent ? LEFT : RIGHT;
    grandFather[sideGrandfather] = node;
  }
  node[direction] = parent;
  parent.parent = node;
  parent[another] = temp;
  if (temp) temp.parent = parent;
};

const buildTree = node => {
  while (node.parent) {
    node = node.parent;
  }
  return node;
};

export { cloneTree, getUncle, getGrandFather, getSibling, rotate, buildTree };

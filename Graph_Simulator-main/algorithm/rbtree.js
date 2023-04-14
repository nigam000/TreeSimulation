import { cloneTree, getUncle, getGrandFather, getSibling, rotate, buildTree } from './functions';
import { RED, BLACK, LEFT, RIGHT } from './constants';

function add(tree, value) {
  const newNode = {
    value,
    left: null,
    right: null,
    parent: null,
    color: RED,
  };

  if (!tree) {
    newNode.color = BLACK;
    return newNode;
  }

  const resultTree = cloneTree(tree);

  let parentNode;
  let currentNode = resultTree;

  while (currentNode) {
    parentNode = currentNode;
    if (currentNode.value === newNode.value) return resultTree;
    currentNode = newNode.value > currentNode.value ? currentNode.right : currentNode.left;
  }

  currentNode = newNode;
  currentNode.parent = parentNode;
  if (currentNode.value > parentNode.value) {
    parentNode.right = currentNode;
  } else {
    parentNode.left = currentNode;
  }

  while (currentNode.color === RED && currentNode.parent && currentNode.parent.color === RED) {
    const uncle = getUncle(currentNode);
    const grandFather = getGrandFather(currentNode);
    const { parent } = currentNode;

    if (uncle && uncle.color === RED) {
      parent.color = BLACK;
      uncle.color = BLACK;
      grandFather.color = RED;
      currentNode = grandFather;
      if (!currentNode.parent) currentNode.color = BLACK;
      continue;
    }

    if (!uncle || uncle.color === BLACK) {
      const sideOfTree = parent === grandFather.left ? LEFT : RIGHT;
      const anotherDirection = parent === grandFather.right ? LEFT : RIGHT;

      if (parent[sideOfTree] === currentNode) {
        currentNode = parent;
        rotate(currentNode, anotherDirection);
        currentNode.color = BLACK;
        currentNode[anotherDirection].color = RED;
      } else {
        rotate(currentNode, sideOfTree);
        rotate(currentNode, anotherDirection);
        currentNode.color = BLACK;
        currentNode[anotherDirection].color = RED;
      }
    }
  }
  return buildTree(currentNode);
}

function remove(tree, value) {
  const resultTree = cloneTree(tree);
  let deletedNode = resultTree;

  while (value !== deletedNode.value) {
    if (value > deletedNode.value) deletedNode = deletedNode.right;
    else deletedNode = deletedNode.left;
    if (!deletedNode) return resultTree;
  }

  let maxInLeft = deletedNode;
  if (deletedNode.left) {
    maxInLeft = deletedNode.left;
    while (maxInLeft.right) {
      maxInLeft = maxInLeft.right;
    }
  }

  deletedNode.value = maxInLeft.value;

  const currentNode = maxInLeft;
  const { parent } = currentNode;
  const direction = parent.left === currentNode ? LEFT : RIGHT;
  const anotherDirection = parent.left === currentNode ? RIGHT : LEFT;

  parent[direction] = null;

  while (currentNode.color === 0 && currentNode.parent) {
    const { parent: currentParent } = currentNode;
    const sibling = getSibling(currentNode);
    const nephewDirection = sibling[direction];
    const nephewAnother = sibling[anotherDirection];
    if (!sibling) break;

    if (sibling.color === RED) {
      sibling.color = BLACK;
      currentParent.color = RED;
      rotate(sibling, direction);
      continue;
    }

    if ((!nephewDirection || nephewDirection.color === BLACK) && (!nephewAnother || nephewAnother.color === BLACK)) {
      sibling.color = RED;
      currentParent.color = BLACK;
      break;
    }

    if ((nephewDirection && nephewDirection.color === RED) && (!nephewAnother || nephewAnother.color === BLACK)) {
      sibling.color = RED;
      nephewDirection.color = BLACK;
      rotate(nephewDirection, anotherDirection);
      continue;
    }

    if (nephewAnother && nephewAnother.color === RED) {
      sibling.color = currentParent.color;
      currentParent.color = BLACK;
      nephewAnother.color = BLACK;
      rotate(sibling, direction);
      break;
    }
  }
  return buildTree(currentNode);
}

export { add, remove };

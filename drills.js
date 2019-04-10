'use strict';
/*
How many searches?

Given a sorted list 3, 5, 6, 8, 11, 12, 14, 15, 17, 18 and are using the recursive binary search algorithm. Identify the sequence of numbers that each recursive call will search to find 8.
12, 6, 11, 8

Given a sorted list 3, 5, 6, 8, 11, 12, 14, 15, 17, 18 and are using the recursive binary search algorithm. Identify thesequence of numbers that each recursive call will search to find 16?
12, 17, 15 return -1 (Not found);

Find a book

Imagine you are looking for a book in a library with a Dewey Decimal index. How would you go about it? Can you expressthis process as a search algorithm? Implement your algorithm to find a book whose Dewey and book title is provided.
On average, Binary search algorithm would be more preferable and efficient. 
*/

// Searching in a BST
// 1) Given a binary search tree whose in-order and pre-order traversals are respectively 14 15 19 25 27 35 79 89 90 91 and 35 25 15 14 19 27 89 79 91 90. What would be its postorder traversal?
// post order = 14, 19, 15, 27, 25, 79, 90, 91, 89, 35

// 1) Given a binary search tree whose in-order and pre-order traversals are respectively 14 15 19 25 27 35 79 89 90 91 and 35 25 15 14 19 27 89 79 91 90. What would be its postorder traversal?
// pre order = 8, 6, 5, 7, 10, 9, 11

function bookSearch(deweyArr, value, start, end) {
  start = start === undefined ? 0 : start;
  end = end === undefined ? deweyArr.length : end;
  if (start > end) {
    return 'Book no existo';
  }
  const index = Math.floor((start + end) / 2);

  if (value === index) {
    return value;
  }
  else if (value > index) {
    return this.bookSearch(deweyArr, value, index+1, end);
  }
  else if (value < index) {
    return this.bookSearch(deweyArr, value, start, index-1);
  }
}

class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (this.key === null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      if (this.left === null) {
        this.left = new BinarySearchTree(key, value, this.key);
      } else {
        this.left.insert(key, value);
      }
    } else {
      if (this.right === null) {
        this.right = new BinarySearchTree(key, value, this.key);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if (this.key === key) {
      return this.value;
    } else if (this.key < key && this.left) {
      return this.left.find(key);
    } else if (this.key > key && this.right) {
      return this.right.find(key);
    } else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        this.remove(successor, key);
      } else if (this.left) {
        this._replaceWith(this.right);
      } else if (this.right) {
        this._replaceWith(this.left);
      } else {
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node;
      } else if (this === this.parent.right) {
        this.parent.right = node;
      }
      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.right = node.right;
        this.left = node.left;
      } else {
        this.key = null;
        this.value = null;
        this.right = null;
        this.left = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  dfsInOrder(values = []) {
    if (this.left) {
      values = this.left.dfsInOrder(values);
    }
    values.push(this.value);
    if (this.right) {
      values = this.right.dfsInOrder(values);
    }
    return values;
  }

  dfsPreOrder(values = []) {
    values.push(this.value);
    if (this.left) {
      values = this.left.dfsPreOrder(values);
    }
    if (this.right) {
      values = this.right.dfsPreOrder(values);
    }
    return values;
  }

  dfsPostOrder(values = []) {
    if (this.left) {
      values = this.left.dfsPostOrder(values);
    }
    if (this.right) {
      values = this.right.dfsPostOrder(values);
    }
    values.push(this.value);
    return values;
  }

  bfs(values) {
    values = values || [];
    const queue = [this];

    while (queue.length) {
      var node = queue.shift();
      values.push(node.value);

      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    return values;
  }
}

// Implement different tree traversals

let dataset = [25, 15, 50, 10, 24, 35, 70, 4, 12, 18, 31, 44, 66, 90, 22];

function createBst(arr) {
  const BST = new BinarySearchTree();
  for (let i = 0; i < arr.length; i++) {
    BST.insert(arr[i], arr[i]);
  }
  return BST;
}
const sortedBST = createBst(dataset);


// Find the next commanding officer
class _Node {
  constructor(value) {
    (this.value = value), 
    (this.next = null);
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }

  enqueue(data) {
    const node = new _Node(data);

    if (this.first === null) {
      this.first = node;
    }

    if (this.last) {
      this.last.next = node;
    }
    this.last = node;
  }
  dequeue() {
    if (this.first === null) {
      return;
    }
    const node = this.first;
    this.first = this.first.next;
    if (node === this.last) {
      this.last = null;
    }
    return node.value;
  }
}

function main() {
  console.log(sortedBST.dfsInOrder());
  console.log(sortedBST.dfsPreOrder());
  console.log(sortedBST.dfsPostOrder());
  const BST = new BinarySearchTree();
  BST.insert(5, 'Captain Picard');
  BST.insert(3, 'Commander Riker');
  BST.insert(2, 'Lt. Cmdr. Worf');
  BST.insert(4, 'Lt. Cmdr. LaForge');
  BST.insert(1, 'Lieutenant security-officer');
  BST.insert(6, 'Commander Data');
  BST.insert(8, 'Lt. Cmdr. Crusher');
  BST.insert(7, 'Lieutenant Selar');
  console.log(BST.bfs());
}

main();
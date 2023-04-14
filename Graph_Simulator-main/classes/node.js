class Node {
  constructor(options) {
    Object.assign(this, options);
    this.node = document.createElement('div');
    this.node.classList.add('node');
    this.node.textContent = this.value;
    this.node.style.backgroundColor = this.color;
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
    if (this.value === 'none') this.node.style.visibility = 'hidden';
    this.field.appendChild(this.node);
  }
}
export { Node };

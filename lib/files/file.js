import Git from './git';

export default class File {
  constructor({ name, status } = {}) {
    if (!name || !status) {
      throw new ReferenceError('File requires at least a name and a status');
    }
    this.name = name;
    this.status = status;
    this.modified = false;
  }

  getDisplayName() {
    if (
      (this.status.endsWith(':none') && !this.modified) ||
      (!this.status.endsWith(':none') && this.modified)
    ) {
      return `{#60971A-fg}✓{/} ${this.name}`;
    }
    return this.name;
  }

  trigger() {
    this.modified = !this.modified;
  }

  get diff() {
    return Git.diff(this.name);
  }
}

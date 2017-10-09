export default class File {
  constructor({
    name,
    status,
  } = {}) {
    this.name = name;
    this.status = status;
    this.modified = false;
  }

  getDisplayName() {
    if (this.status === 'staged') {
      return `{#60971A-fg}✓{/} ${this.name}`;
    }
    return this.name;
  }

  trigger() {
    this.status = this.status === 'staged' ? 'untracked' : 'staged';
    this.modified = !this.modified;
  }
}

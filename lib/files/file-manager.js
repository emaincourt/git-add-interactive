import Git from './git';
import File from './file';

export default class FileManager {
  constructor(files) {
    this.files = files.filter(
      file => file.name && file.status,
    ) || [];
  }

  applyChanges() {
    const modified = [];
    this.files.filter(file => file.modified).forEach((file) => {
      switch (file.status) {
        case 'staged':
          Git.stage(file.name);
          break;
        case 'untracked':
          Git.unstage(file.name);
          break;
        case 'modified':
          Git.stage(file.name);
          break;
        default:
          break;
      }
      file.modified = !file.modified;
      modified.push(file);
    });
    return modified;
  }

  static getStatus(file) {
    if (file.startsWith('AM')) {
      return 'modified';
    }
    if (file.startsWith('A')) {
      return 'staged';
    }
    return 'untracked';
  }

  static fromGit() {
    const files = (
      Git.status()
    ).split('\n').filter(file => file !== '' && !file.startsWith('D')).map(file =>
      new File({
        name: file.split(' ').pop(),
        status: this.getStatus(file),
      }),
    );
    return new FileManager(files);
  }
}

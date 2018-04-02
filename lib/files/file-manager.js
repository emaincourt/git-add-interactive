import Git from './git';
import File from './file';

export default class FileManager {
  constructor(files) {
    this.files = [].concat(files).filter(file => file.name && file.status);
  }

  applyChanges() {
    return this.files.filter(file => file.modified).map(file => {
      if (file.status.endsWith(':none')) {
        Git.unstage(file.name);
      } else {
        Git.stage(file.name);
      }
      return file;
    });
  }

  static getStatus(file) {
    switch (file.substr(0, 2)) {
      case 'AD':
        return 'added:deleted';
      case 'AM':
        return 'added:modified';
      case 'A ':
        return 'added:none';
      case ' D':
        return 'none:deleted';
      case 'M ':
        return 'modified:none';
      case 'MD':
        return 'modified:deleted';
      case 'MM':
        return 'modified:modified';
      case ' M':
        return 'none:modified';
      case '??':
        return 'untracked:untracked';
      default:
        return 'untracked:untracked';
    }
  }

  static fromGit() {
    const files = Git.status()
      .split('\n')
      .filter(file => file !== '' && !file.startsWith('D'))
      .map(
        file =>
          new File({
            name: file.split(' ').pop(),
            status: this.getStatus(file)
          })
      );
    return new FileManager(files);
  }
}

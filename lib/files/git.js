import { execSync } from 'child_process';

export default class Git {
  static status() {
    return execSync('git status -s').toString();
  }

  static stage(fileName) {
    return execSync(`git add ${fileName}`);
  }

  static unstage(fileName) {
    return execSync(`git rm --cached ${fileName}`);
  }

  static diff(fileName) {
    return execSync(`git diff --color=always ${fileName}`).toString();
  }
}

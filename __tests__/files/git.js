import childProcess from 'child_process';
import Git from '../../lib/files/git';

describe('#methods', () => {
  it('gets the status of a repository', () => {
    expect.assertions(1);
    const mocks = {
      'childProcess.execSync': jest.spyOn(childProcess, 'execSync')
        .mockImplementationOnce(() => new Buffer('')),
    };
    Git.status();
    expect(mocks['childProcess.execSync']).toHaveBeenCalledWith('git status -s');
    Object.keys(mocks).forEach(mock => mocks[mock].mockRestore());
  });

  it('stages a file', () => {
    expect.assertions(1);
    const mocks = {
      'childProcess.execSync': jest.spyOn(childProcess, 'execSync')
        .mockImplementationOnce(() => {}),
    };
    Git.stage('any-file-name');
    expect(mocks['childProcess.execSync']).toHaveBeenCalledWith('git add any-file-name');
    Object.keys(mocks).forEach(mock => mocks[mock].mockRestore());
  });

  it('unstages a file', () => {
    expect.assertions(1);
    const mocks = {
      'childProcess.execSync': jest.spyOn(childProcess, 'execSync')
        .mockImplementationOnce(() => {}),
    };
    Git.unstage('any-file-name');
    expect(mocks['childProcess.execSync']).toHaveBeenCalledWith('git rm --cached any-file-name');
    Object.keys(mocks).forEach(mock => mocks[mock].mockRestore());
  });
});

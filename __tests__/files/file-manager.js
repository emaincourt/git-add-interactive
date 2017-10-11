import FileManager from '../../lib/files/file-manager';
import Git from '../../lib/files/git';

describe('#constructor', () => {
  it('creates a file manager from an array of files with the right format', () => {
    expect.assertions(2);
    const files = [
      { name: 'foo', status: 'bar' },
    ];
    const fileManager = new FileManager(files);
    expect(fileManager.files[0]).toEqual(files[0]);
    expect(fileManager.files.length).toEqual(1);
  });

  it('filters files that do not match the right structure', () => {
    expect.assertions(1);
    const files = [
      '',
      { name: 'foo' },
      { status: 'bar' },
      123,
    ];
    const fileManager = new FileManager(files);
    expect(fileManager.files.length).toEqual(0);
  });
});

describe('#fromGit', () => {
  it('instantiantes a new file manager from git', () => {
    expect.assertions(2);
    const mocks = {
      'Git.status': jest.spyOn(Git, 'status')
        .mockImplementationOnce(() => [
          'A foo',
          '? bar',
          'AM mo',
        ].join('\n')),
    };
    const fileManager = FileManager.fromGit();
    expect(mocks['Git.status']).toHaveBeenCalled();
    expect(fileManager.files).toEqual(expect.arrayContaining([
      { name: 'foo', status: 'staged', modified: false },
      { name: 'bar', status: 'untracked', modified: false },
      { name: 'mo', status: 'modified', modified: false },
    ]));
    Object.keys(mocks).forEach(mock => mocks[mock].mockRestore());
  });

  it('doesn\'t add deleted files to the file manager', () => {
    expect.assertions(2);
    const mocks = {
      'Git.status': jest.spyOn(Git, 'status')
        .mockImplementationOnce(() => 'D abc'),
    };
    const fileManager = FileManager.fromGit();
    expect(mocks['Git.status']).toHaveBeenCalled();
    expect(fileManager.files).toEqual(expect.arrayContaining([]));
    Object.keys(mocks).forEach(mock => mocks[mock].mockRestore());
  });
});

describe('#getStatus', () => {
  it('is able to find the status for an added file', () => {
    expect.assertions(1);
    expect(
      FileManager.getStatus('A'),
    ).toEqual('staged');
  });

  it('is able to find the status for a modified file', () => {
    expect.assertions(1);
    expect(
      FileManager.getStatus('AM'),
    ).toEqual('modified');
  });

  it('will consider any other file as untracked', () => {
    expect.assertions(1);
    expect(
      FileManager.getStatus('??'),
    ).toEqual('untracked');
  });
});

describe('#applyChanges', () => {
  it('applies changes if needed according to the previous status', () => {
    expect.assertions(4);
    const files = [
      { name: 'foo', status: 'staged', modified: true },
      { name: 'bar', status: 'untracked', modified: true },
      { name: 'foobar', status: 'modified', modified: true },
      { name: 'abc', status: 'deleted', modified: true },
      { name: 'barfoo', status: 'modified', modified: false },
    ];
    const mocks = {
      'Git.stage': jest.spyOn(Git, 'stage')
        .mockImplementation(() => {}),
      'Git.unstage': jest.spyOn(Git, 'unstage')
        .mockImplementation(() => {}),
    };
    const fileManager = new FileManager(files);
    expect(
      fileManager.applyChanges(),
    ).toEqual(
      expect.arrayContaining([
        { name: 'foo', status: 'staged', modified: false },
        { name: 'bar', status: 'untracked', modified: false },
        { name: 'abc', status: 'deleted', modified: false },
        { name: 'foobar', status: 'modified', modified: false },
      ]),
    );
    expect(mocks['Git.stage'].mock.calls[0][0]).toEqual('foo');
    expect(mocks['Git.stage'].mock.calls[1][0]).toEqual('foobar');
    expect(mocks['Git.unstage'].mock.calls[0][0]).toEqual('bar');
  });
});

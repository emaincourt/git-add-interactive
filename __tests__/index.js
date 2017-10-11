import eventEmitter from '../lib/events';

beforeEach(() => {
  jest.mock('../lib/files/file-manager', () => class FileManager {
    constructor(files) {
      this.files = files;
    }
    static fromGit() {
      return new FileManager([]);
    }
  });
  jest.mock('../lib/interface', () => class Interface {
    constructor() {
      this.setFiles = jest.fn();
    }
  });
});

afterEach(() => {
  jest.resetModules();
});

test('it subscribes the event emitter to the right events and starts the interface', () => {
  expect.assertions(3);
  const Interface = require('../lib/interface');
  const FileManager = require('../lib/files/file-manager');
  const mocks = {
    'eventEmitter.on': jest.spyOn(eventEmitter, 'on')
      .mockImplementation(() => {}),
  };
  require('../lib');
  expect(mocks['eventEmitter.on'].mock.calls[0][0]).toEqual('triggerItem');
  expect(mocks['eventEmitter.on'].mock.calls[1][0]).toEqual('triggerAllItems');
  expect(mocks['eventEmitter.on'].mock.calls[2][0]).toEqual('applyModifications');
  Object.keys(mocks).forEach(mock => mocks[mock].mockRestore());
});

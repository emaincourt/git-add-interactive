import { pick } from 'lodash';

beforeEach(() => {
  jest.mock('../../lib/interface/screen', () => ({
    append: jest.fn(),
    render: jest.fn()
  }));
  jest.mock('../../lib/interface/layout', () => ({
    append: jest.fn()
  }));
  jest.mock('../../lib/interface/header', () => ({}));
  jest.mock('../../lib/interface/list', () => ({
    focus: jest.fn(),
    setItems: jest.fn()
  }));
  jest.mock('../../lib/interface/footer', () => ({ setContent: jest.fn() }));
  jest.mock('../../lib/interface/diff', () => ({}));
});

afterEach(() => {
  jest.resetModules();
});

describe('#constructor', () => {
  it('attaches all the components to the interface on instantiation', () => {
    expect.assertions(1);
    const Interface = require('../../lib/interface').default;
    const term = new Interface();
    expect(
      pick(term, 'screen', 'layout', 'header', 'list', 'footer')
    ).toMatchSnapshot();
  });
});

describe('#render', () => {
  it('renders all the components of the screen', () => {
    expect.assertions(1);
    const Interface = require('../../lib/interface').default;
    const term = new Interface();
    const mocks = {
      'screen.render': jest
        .spyOn(term.screen, 'render')
        .mockImplementationOnce(() => {})
    };
    term.render();
    expect(mocks['screen.render']).toHaveBeenCalled();
  });
});

describe('#linkComponents', () => {
  it('links all the components of the screen', () => {
    expect.assertions(4);
    const Interface = require('../../lib/interface').default;
    const term = new Interface();
    const mocks = {
      'layout.append': jest
        .spyOn(term.layout, 'append')
        .mockImplementation(() => {}),
      'screen.append': jest
        .spyOn(term.screen, 'append')
        .mockImplementation(() => {}),
      'screen.render': jest
        .spyOn(term.screen, 'render')
        .mockImplementationOnce(() => {}),
      'list.focus': jest
        .spyOn(term.list, 'focus')
        .mockImplementationOnce(() => {})
    };
    term.linkComponents();
    expect(mocks['layout.append'].mock.calls.length).toBe(6);
    expect(mocks['screen.append'].mock.calls.length).toBe(4);
    expect(mocks['list.focus'].mock.calls.length).toBe(2);
    expect(mocks['screen.render'].mock.calls.length).toBe(2);
  });
});

describe('#setFiles', () => {
  it('sets the files of the list', () => {
    expect.assertions(1);
    const Interface = require('../../lib/interface').default;
    const term = new Interface();
    const mocks = {
      'list.setItems': jest
        .spyOn(term.list, 'setItems')
        .mockImplementationOnce(() => {})
    };
    term.setFiles([]);
    expect(mocks['list.setItems']).toHaveBeenCalledWith([]);
  });
});

describe('#updateFooter', () => {
  it('sets the files of the list', () => {
    expect.assertions(1);
    const Interface = require('../../lib/interface').default;
    const term = new Interface();
    const mocks = {
      'footer.setContent': jest
        .spyOn(term.footer, 'setContent')
        .mockImplementationOnce(() => {})
    };
    term.updateFooter([]);
    expect(mocks['footer.setContent']).toHaveBeenCalledWith('');
  });
});

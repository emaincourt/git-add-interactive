import blessed from 'blessed';

describe('#header', () => {
  it('instantiates the header', () => {
    expect.assertions(1);
    const mocks = {
      'blessed.text': jest
        .spyOn(blessed, 'text')
        .mockImplementationOnce(() => {})
    };
    require('../../lib/interface/header');
    expect(mocks['blessed.text']).toHaveBeenCalled();
    Object.keys(mocks).forEach(mock => mocks[mock].mockRestore());
  });
});

describe('#footer', () => {
  it('instantiates the footer', () => {
    expect.assertions(1);
    const mocks = {
      'blessed.text': jest
        .spyOn(blessed, 'text')
        .mockImplementationOnce(() => {})
    };
    require('../../lib/interface/footer');
    expect(mocks['blessed.text']).toHaveBeenCalled();
    Object.keys(mocks).forEach(mock => mocks[mock].mockRestore());
  });
});

describe('#list', () => {
  it('instantiates the list', () => {
    expect.assertions(5);
    const key = jest.fn();
    const on = jest.fn();
    const mocks = {
      'blessed.list': jest
        .spyOn(blessed, 'list')
        .mockImplementationOnce(() => ({ key, on })),
      'blessed.text': jest
        .spyOn(blessed, 'text')
        .mockImplementationOnce(() => ({ key }))
    };
    require('../../lib/interface/list');
    expect(mocks['blessed.list']).toHaveBeenCalled();
    expect(key.mock.calls[0][0]).toEqual(['space']);
    expect(key.mock.calls[1][0]).toEqual(['d']);
    expect(key.mock.calls[2][0]).toEqual(['C-a']);
    expect(key.mock.calls[3][0]).toEqual(['enter']);
    Object.keys(mocks).forEach(mock => mocks[mock].mockRestore());
  });
});

describe('#layout', () => {
  it('instantiates the layout', () => {
    expect.assertions(1);
    const mocks = {
      'blessed.layout': jest
        .spyOn(blessed, 'layout')
        .mockImplementationOnce(() => {})
    };
    require('../../lib/interface/layout');
    expect(Object.keys(mocks['blessed.layout'].mock.calls[0][0])).toEqual(
      expect.arrayContaining(['width', 'height', 'renderer'])
    );
    Object.keys(mocks).forEach(mock => mocks[mock].mockRestore());
  });

  it('aligns the items the right way', () => {
    const renderer = require('../../lib/interface/layout').renderer;
    class MyLayout {
      constructor() {
        this.renderer = renderer;
        this.children = [];
        this.getLastCoords = jest.fn(i => !(i === 0));
      }
    }
    const layout = new MyLayout();
    const items = [
      {
        shrink: false,
        position: { left: null, top: null }
      },
      {
        shrink: false,
        position: { left: null, top: null }
      }
    ];
    layout.renderer()(items[0], 0);
    layout.renderer()(items[1], 1);
    expect(typeof renderer).toBe('function');
    expect(typeof renderer()).toBe('function');
    expect(items[0].shrink).toBeTruthy();
    expect(items[0].position.left).toEqual(0);
    expect(items[0].position.top).toEqual(0);
    expect(items[0].position.left).toEqual(0);
    expect(items[0].position.top).toEqual(0);
  });
});

describe('#screen', () => {
  it('instantiates the screen', () => {
    expect.assertions(2);
    const key = jest.fn();
    const mocks = {
      'blessed.screen': jest
        .spyOn(blessed, 'screen')
        .mockImplementationOnce(() => ({ key }))
    };
    require('../../lib/interface/screen');
    expect(mocks['blessed.screen']).toHaveBeenCalled();
    expect(key.mock.calls[0][0]).toEqual(['q', 'C-c']);
    Object.keys(mocks).forEach(mock => mocks[mock].mockRestore());
  });
});

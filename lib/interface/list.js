import blessed from 'blessed';
import diff from './diff';
import eventEmitter from '../events';

const list = blessed.list({
  height: '50%',
  padding: {
    left: 3
  },
  top: '10%',
  style: {
    selected: {
      bold: true
    }
  },
  keys: true,
  mouse: true,
  tags: true
});

function getCurrentItem() {
  return list.getItem(list.selected).content;
}

list.key(['space'], () => eventEmitter.emit('triggerItem', getCurrentItem()));
list.key(['d'], () => eventEmitter.emit('getDiff', getCurrentItem()));

list.key(['C-a'], () => eventEmitter.emit('triggerAllItems'));
list.key(['enter'], () => eventEmitter.emit('applyModifications'));

list.on('keypress', () => {
  if (diff.visible) {
    diff.hide();
    eventEmitter.emit('refresh');
  }
});

export default list;

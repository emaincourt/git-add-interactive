import blessed from 'blessed';
import eventEmitter from '../events';

const list = blessed.list({
  height: '50%',
  padding: {
    left: 3,
  },
  top: '10%',
  style: {
    selected: {
      bold: true,
    },
  },
  keys: true,
  mouse: true,
  tags: true,
});

list.key(['space'], () => eventEmitter.emit('triggerItem', list.getItem(list.selected).content));
list.key(['C-a'], () => eventEmitter.emit('triggerAllItems'));
list.key(['enter'], () => eventEmitter.emit('applyModifications'));

export default list;

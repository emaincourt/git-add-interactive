import blessed from 'blessed';

export function renderer(coords) { // eslint-disable-line
  const self = this;
  let rowOffset = 0;
  let rowIndex = 0;
  return function iterator(el, i) {
    Reflect.set(el, 'shrink', true);
    const last = self.getLastCoords(i);
    if (!last) {
      el.position.left = 0; // eslint-disable-line
      el.position.top = 0; // eslint-disable-line
    } else {
      rowOffset += self.children.slice(rowIndex, i).reduce((acc, next) => {
        if (!self.isRendered(next)) {
          return acc;
        }
        return Math.max(acc, next.lpos.yl - next.lpos.yi);
      }, 0);
      rowIndex = i;
      el.position.left = 0; // eslint-disable-line
      el.position.top = rowOffset; // eslint-disable-line
    }
  };
}

const layout = blessed.layout({
  width: '100%',
  height: '50%',
  renderer,
});

export default layout;

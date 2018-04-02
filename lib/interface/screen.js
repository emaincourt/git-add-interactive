import blessed from 'blessed';

const screen = blessed.screen({
  smartCSR: true
});

screen.key(['q', 'C-c'], () => process.exit(0));

export default screen;

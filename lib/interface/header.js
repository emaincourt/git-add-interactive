import blessed from 'blessed';
import emoji from 'node-emoji';

const header = blessed.text({
  tags: true,
  content: [
    '{bold}git-add-interactive 0.1.2{/bold}',
    `\n${emoji.get('star')} \xa0 Files ready for staging :`,
  ].join('\n'),
  valign: 'middle',
  padding: {
    left: 1,
    right: 3,
  },
  border: {
    type: 'line',
  },
});

export default header;

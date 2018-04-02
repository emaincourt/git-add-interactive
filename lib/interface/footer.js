import blessed from 'blessed';

const footer = blessed.text({
  width: '100%',
  tags: true,
  content: '',
  valign: 'middle',
  padding: {
    left: 1
  }
});

export default footer;

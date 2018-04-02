import blessed from 'blessed';

const diff = blessed.text({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  tags: true,
  hidden: true,
  content: '',
  scrollable: true,
  draggable: true,
  clickable: true,
  keys: true,
  mouse: true,
  border: {
    type: 'line'
  },
  style: {
    border: {
      fg: '#f0f0f0'
    }
  }
});

export default diff;

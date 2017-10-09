import FileManager from './files/file-manager';
import Interface from './interface';
import eventEmitter from './events';

const fileManager = FileManager.fromGit();
const term = new Interface();

function refreshContent() {
  return term.setFiles(
    fileManager.files.map(file => file.getDisplayName()),
  );
}

eventEmitter.on('triggerItem', (item) => {
  const file = fileManager.files.find(
    el => item.endsWith(el.name),
  );
  file.trigger();
  refreshContent();
});

eventEmitter.on('triggerAllItems', () => {
  fileManager.files.forEach(file => file.trigger());
  refreshContent();
});

eventEmitter.on('applyModifications', async () => {
  const modified = fileManager.applyChanges();
  term.updateFooter(
    modified.map(item => item.getDisplayName()),
  );
});

refreshContent();
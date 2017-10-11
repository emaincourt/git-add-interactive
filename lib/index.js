import FileManager from './files/file-manager';
import Interface from './interface';
import eventEmitter from './events';

let fileManager = FileManager.fromGit();
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
  if (file) {
    file.trigger();
  }
  refreshContent();
});

eventEmitter.on('triggerAllItems', () => {
  fileManager.files.forEach(file => file.trigger());
  refreshContent();
});

eventEmitter.on('applyModifications', async () => {
  const modified = fileManager.applyChanges();
  term.updateFooter(
    modified.map(item => item.name),
  );
  fileManager = FileManager.fromGit();
  refreshContent();
});

refreshContent();

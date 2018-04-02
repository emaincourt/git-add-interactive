import screen from './screen';
import layout from './layout';
import header from './header';
import list from './list';
import footer from './footer';
import diff from './diff';

export default class Interface {
  constructor() {
    this.screen = screen;
    this.layout = layout;
    this.header = header;
    this.list = list;
    this.footer = footer;
    this.diff = diff;
    this.linkComponents();
  }

  render() {
    this.screen.render();
  }

  linkComponents() {
    this.layout.append(header);
    this.layout.append(list);
    this.layout.append(footer);
    this.screen.append(layout);
    this.screen.append(diff);
    this.list.focus();
    this.render();
  }

  setFiles(items) {
    this.list.setItems(items);
    this.render();
  }

  updateFooter(content) {
    this.footer.setContent(
      [
        content.length
          ? '{#FDA429-fg}•{/} \xa0{bold}The following files have been successfully modified :{/bold}'
          : '',
        ...content
      ].join('\n')
    );
    this.render();
  }
}

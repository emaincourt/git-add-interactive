[![NPM](https://nodei.co/npm/git-add-interactive.png?compact=true)](https://npmjs.org/package/git-add-interactive)

[![CircleCI](https://circleci.com/gh/emaincourt/git-add-interactive.svg?style=shield)](https://circleci.com/gh/emaincourt/git-add-interactive)
[![codecov](https://codecov.io/gh/emaincourt/git-add-interactive/branch/master/graph/badge.svg)](https://codecov.io/gh/emaincourt/git-add-interactive)

## <img src="https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png" height="30px" width="auto"> git-add-interactive

Leverages the [blessed](https://github.com/chjj/blessed) library to provide an alternative to `git add -i`, giving the ability to dynamically add/remove files of the next commit.

### :school_satchel: Getting started

You first need to install `git-add-interactive` for being able to run it :

```bash
yarn global add git-add-interactive
```

You can then simply run `git-add-interactive` from your project root folder or add an alias to git doing :

```bash
git config --global alias.add-interactive "!git-add-interactive"
```

### :dart: How does it work ?

`git-add-interactive` is yet able to :

* stage a newly created or modified file
* remove a newly created or modified file
* show the diff of the currently selected file

Each file that will be displayed with a ✓ has been either already staged before or will be after pressing `enter`. Navigate with the `up` and `down` arrows of your keyboard and press `press` to trigger the selection of a file. You can also use `ctrl + a` to automatically trigger all files. Press then `Enter` to apply the changes.

You can also press `d` to show the diff of the file. Any other key press will hide the diff window. This diff window is also scrollable and draggable.

Press `ctrl + c` or `q` to leave the interface.

<p align="center"><img src="https://gifyu.com/images/2017-10-09-22.38.31.gif" width="50%" height="auto" style="margin-left: 50%" /></p>

Feel free to let me know and I will fix the issues as far as I can.

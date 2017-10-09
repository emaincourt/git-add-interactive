## :card_index: git-add-interactive

Leverages the [blessed](https://github.com/chjj/blessed) library to provide an alternative to `git add -i`, giving the ability to dynamically stage/remove files before committing.

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
- stage a newly created or modified file
- remove a newly created or modified file

Each file that will be displayed with a ✓ has been either already staged before or will be. Navigate with the `up` and `down` arrows of your keyboard to trigger a file. You can also use `ctrl + a` to automatically trigger all files. Press then `Enter` to apply the changes.

Press `ctrl + c` or `q` to leave the interface.

<p align="center"><img src="https://gifyu.com/images/2017-10-09-22.38.31.gif" width="50%" height="auto" style="margin-left: 50%" /></p>

This is a very young release and there are probably a lot of cases that are not yet handled. Feel free to let me know and I will fix the issues as far as I can.

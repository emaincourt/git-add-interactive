import { omit } from 'lodash';
import File from '../../lib/files/file';

describe('#constructor', () => {
  it('instantiantes a new file setting its modified attribute to false', () => {
    expect.assertions(1);
    const params = {
      name: 'foo',
      status: 'bar',
    };
    expect(
      new File(params),
    ).toMatchObject({
      ...params,
      modified: false,
    });
  });

  it('throws an error if the file name, status, or both of them are missing', () => {
    expect.assertions(3);
    const params = {
      name: 'foo',
      status: 'bar',
    };
    expect(
      () => new File(omit(params, 'name')),
    ).toThrowErrorMatchingSnapshot();
    expect(
      () => new File(omit(params, 'status')),
    ).toThrowErrorMatchingSnapshot();
    expect(
      () => new File(omit(params, 'name', 'status')),
    ).toThrowErrorMatchingSnapshot();
  });
});

describe('#getDisplayName', () => {
  it('returns the display name of the file by adding an icon in front if the file status is staged', () => {
    expect.assertions(1);
    const params = {
      name: 'foo',
      status: ':none',
    };
    expect(
      (new File(params)).getDisplayName(),
    ).toMatchSnapshot();
  });

  it('returns the name of the file as is if the file status is not staged', () => {
    expect.assertions(1);
    const params = {
      name: 'foo',
      status: 'bar',
    };
    expect(
      (new File(params)).getDisplayName(),
    ).toMatchSnapshot();
  });
});

describe('#trigger', () => {
  it('triggers a file for being staged/unstaged', () => {
    expect.assertions(4);
    const params = {
      name: 'foo',
      status: ':none',
    };
    const file = new File(params);
    file.trigger();
    expect(file.status).toEqual(':none');
    expect(file.modified).toEqual(true);
    file.trigger();
    expect(file.status).toEqual(':none');
    expect(file.modified).toEqual(false);
  });
});

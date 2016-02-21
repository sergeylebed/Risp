export default class FileModel {
  constructor(current, rename) {
    this._current = current;
    this._rename = rename;
  }

  rename(name) {
    if(name === undefined) {
      return this._rename;
    } else {
      return new FileModel(this._current, name);
    }
  }

  current() {
    return this._current;
  }
}

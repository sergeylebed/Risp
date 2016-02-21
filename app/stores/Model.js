export default class Model {
  constructor(openFile, files) {
    this._openFile = openFile;
    this._files = files;
  }

  exists(name) {
    return Object.keys(this._files).some((nm) => nm === name);
  }

  current() {
    return this._openFile;
  }

  open(name, data) {
    if(data === undefined) {
      if(this.exists(name)) {
        return new Model(name, this._files);
      } else {
        return this;
      }
    } else {
      return new Model(name, Object.assign({}, this._files, {[name]: data}));
    }
  }

  close() {
    return new Model(null, this._files);
  }

  file(name, data) {
    if(data === undefined) {
        return this._files[name];
    } else {
        return new Model(
          this._openFile,
          Object.assign({}, this._files, { [name]: data })
        );
    }
  }

  files() {
    return Object.keys(this._files);
  }

  remove(name) {
    return new Model(
      this._openFile === name ? null : this._openFile,
      Object.keys(this._files).reduce((acc, nm) => {
        if(nm !== name) {
          acc[nm] = this._files[nm];
        }

        return acc;
      }, {})
    );
  }

  rename(oldName, newName) {
      return this.remove(oldName).open(newName, this.file(oldName));
  }

  convert(converter) {
    return Object.keys(this._files).reduce((acc, name) => {
      acc[name] = converter(this._files[name]);
      return acc;
    }, {});
  }

  static unconvert(unconverter, data) {
    return new Model(
      null,
      Object.keys(data).reduce((acc, name) => {
        acc[name] = unconverter(data[name]);
        return acc;
      }, {})
    );
  }
}

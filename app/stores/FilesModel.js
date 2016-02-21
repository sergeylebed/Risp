export default class FilesModel {
  constructor(files) {
    this._files = files;
  }

  exists(name) {
    return Object.keys(this._files).some((nm) => nm === name);
  }

  files() {
    return Object.keys(this._files);
  }

  file(name, data) {
    if(data === undefined) {
        return this._files[name];
    } else {
        return new FilesModel(
          Object.assign({}, this._files, { [name]: data })
        );
    }
  }

  remove(name) {
    return new FilesModel(
      Object.keys(this._files).reduce((acc, nm) => {
        if(nm !== name) {
          acc[nm] = this._files[nm];
        }

        return acc;
      }, {})
    );
  }

  rename(oldName, newName) {
      return this.remove(oldName).file(newName, this.file(oldName));
  }

  convert(converter) {
    return Object.keys(this._files).reduce((acc, name) => {
      acc[name] = converter(this._files[name]);
      return acc;
    }, {});
  }

  static unconvert(unconverter, data) {
    return new FilesModel(Object.keys(data).reduce((acc, name) => {
      acc[name] = unconverter(data[name]);
      return acc;
    }, {}));
  }
}

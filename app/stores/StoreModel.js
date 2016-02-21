import FileModel from './FileModel.js'
import Exercise from './Exercise.js';

export default class StoreModel {
  constructor(files, file) {
    this._files = files;
    this._file = file;
  }

  _mode() {
    if(this._file !== null) return 'open';
    return 'list';
  }

  files() {
    return this._files;
  }

  currentName() {
    return this._file;
  }

  currentFile() {
    return this._files.file(this._file.current());
  }

  // API here

  New() {
    if(this._mode() !== 'list') return this;

    return new StoreModel(
      this._files.file('', new Exercise(null, null, null)),
      new FileModel('', '')
    );
  }

  Open(name) {
    if(this._mode() !== 'list' || !this._files.exists(name)) return this;

    return new StoreModel(
      this._files,
      new FileModel(name, null)
    );
  }

  Delete(name) {
    if(this._mode() !== 'list') return this;

    return new StoreModel(
      this._files.remove(name),
      null
    );
  }

  Close() {
    if(this._mode() !== 'open') return this;

    return new StoreModel(
      this._files,
      null
    );
  }

  Save(data) {
    if(this._mode() !== 'open') return this;

    return new StoreModel(
      this._files.file(this._file.current(), data),
      this._file
    );
  }

  BeginRename() {
    if(this._mode() !== 'open') return this;

    return new StoreModel(
      this._files,
      this._file.rename(this._file.current())
    );
  }

  Rename(name) {
    if(this._mode() !== 'open') return this;

    return new StoreModel(
      this._files,
      this._file.rename(name)
    );
  }

  EndRename() {
    if(this._mode() !== 'open') return this;

    return new StoreModel(
      this._files.rename(this._file.current(), this._file.rename()),
      new FileModel(this._file.rename(), null)
    );
  }
}

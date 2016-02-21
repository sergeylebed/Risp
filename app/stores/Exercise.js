export default class Exercise {
  constructor(restTime, phases, repeat) {
    this._restTime = restTime;
    this._phases = phases;
    this._repeat = repeat;
  }

  restTime(value) {
    if(value === undefined) {
      return this._restTime;
    }
    else {
      return new Exercise(value, this._phases, this._repeat);
    }
  }

  phases(size) {
    if(size === undefined) {
      return this._phases;
    } else {
      var value = (this._phases || []).slice(0, size);
      if(value.length < size) {
        value = [...value, ...new Array(size - value.length).fill(null)];
      }
      return new Exercise(this._restTime, value, this._repeat);
    }
  }

  phase(id, value) {
    if(value === undefined) {
      return this._phases[id];
    } else {
      return new Exercise(this._restTime, this._phases.map((v, i) => i === id ? value : v), this._repeat);
    }
  }

  repeat(value) {
    if(value === undefined) {
      return this._repeat;
    } else {
      return new Exercise(this._restTime, this._phases, value);
    }
  }

  valid() {
    return this._restTime !== null &&
    this._phases !== null &&
    this._repeat !== null &&
    this._phases.every((ph) => ph !== null);
  }

  toRaw() {
    return {
      restTime: this._restTime,
      repeat: this._repeat,
      phases: this._phases
    };
  }

  static fromRaw(obj) {
    return new Exercise(obj.restTime, obj.phases, obj.repeat);
  }
}

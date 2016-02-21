export default class Exercise {
  constructor(restTime, phases, repeat) {
    this._restTime = restTime;
    this._phases = phases;
    this._repeat = repeat;
  }

  restTime(value) {
    if(value !== undefined) {
      return new Exercise(value, this._phases, this._repeat);
    }
    else {
      return this._restTime;
    }
  }

  phases(size) {
    if(size !== undefined) {
      var value = (this._phases || []).slice(0, size);
      if(value.length < size) {
        value = [...value, ...new Array(size - value.length).fill(null)];
      }
      return new Exercise(this._restTime, value, this._repeat);
    } else {
      return this._phases;
    }
  }

  phase(id, value) {
    if(value !== undefined) {
      return new Exercise(this._restTime, this._phases.map((v, i) => i === id ? value : v), this._repeat);
    } else {
      return this._phases[id];
    }
  }

  repeat(value) {
    if(value !== undefined) {
      return new Exercise(this._restTime, this._phases, value);
    } else {
      return this._repeat;
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

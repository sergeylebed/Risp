const sounds = {
  "beep": new Wad({
    source: 'triangle',
    volume: 1,
    env: {
      attack  : 0.0,
      decay   : 0.0,
      sustain : 0.5,
      hold    : 0.1,
      release : 0
    },
    filter  : {
        type      : 'lowpass',
        frequency : 7000,
        q         : 1
    },
    duration: 100
  }),
  "tick": new Wad({
    source: 'sawtooth',
    volume: 0.2,
    env: {
      attack  : 0.0,
      decay   : 0.0,
      sustain : 0.2,
      hold    : 0.05,
      release : 0
    },
    filter  : {
        type      : 'highpass',
        frequency : 10000,
        q         : 1
    },
    duration: 100
  }),
  "start": new Wad({
    source: 'sawtooth',
    volume: 1,
    env: {
      attack  : 0.0,
      decay   : 0.2,
      sustain : 0.3,
      hold    : 0.3,
      release : 0
    },
    filter  : {
        type      : 'lowpass',
        frequency : 700,
        q         : 1
    },
    duration: 100
  }),
  "stop": new Wad({
    source: 'sawtooth',
    volume: 1,
    env: {
      attack  : 0.0,
      decay   : 0.2,
      sustain : 0.5,
      hold    : 0.1,
      release : 0
    },
    filter  : {
        type      : 'highpass',
        frequency : 800,
        q         : 1
    },
    duration: 100
  })
};

class BasePlayer {
  constructor(sounds) {
    this._sounds = sounds;
    this._current = null;
  }

  sounds() {
    return Object.keys(this._sounds);
  }

  _stop() {
    if(this._current !== null) {
      this._current.stop();
    }
  }

  _play(name, config) {
    if(!this._sounds[name]) {
      return;
    }

    this._stop();
    (this._current = this._sounds[name]).play();
  }
}

class Player extends BasePlayer {
  constructor(sounds) {
    super(sounds);
  }

  tick() {
//    this._play('tick');
  }

  beep() {
    this._play('beep');
  }

  start() {
    this._play('start');
  }

  stop() {
    this._play('stop');
  }
}

const Sounds = new Player(sounds);
export default Sounds;

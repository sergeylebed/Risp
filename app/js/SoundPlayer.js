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
    volume: 1,
    env: {
      attack  : 0.0,
      decay   : 0.0,
      sustain : 0.5,
      hold    : 0.1,
      release : 0
    },
    filter  : {
        type      : 'highpass',
        frequency : 700,
        q         : 1
    },
    duration: 100
  })
};

class Player {
  constructor(sounds) {
    this._sounds = sounds;
    this._current = null;
  }

  sounds() {
    return Object.keys(this._sounds);
  }

  stop() {
    if(this._current !== null) {
      this._current.stop();
    }
  }

  play(name, config) {
    if(!this._sounds[name]) {
      return;
    }

    this.stop();
    (this._current = this._sounds[name]).play();
  }

}

const SoundPlayer = new Player(sounds);
export default SoundPlayer;

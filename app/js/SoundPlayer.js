const sounds = {
  "beep-1": new Wad({
    source: '../vendor/sounds/beep-07.mp3'
  }),
  "beep-2": new Wad({
    source: '../vendor/sounds/beep-08.mp3'
  }),
  "beep-3": new Wad({
    source: 'triangle',
    volume: 2,
    env: {
      attack  : 0.0,
      decay   : 0.0,
      sustain : 0.2,
      hold    : 0.1,
      release : 0
    },
    filter  : {
        type      : 'lowpass',
        frequency : 700,
        q         : 3
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

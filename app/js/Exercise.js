import Sounds from './SoundPlayer.js';

export class Exercise {

    constructor(
        name, 
        phases = [], 
        delaySec = 2, 
        count = 1, 
        delaySoundOn = true,
        countSoundOn = true) {
        this.name = name;
        this.phases = phases;
        this.delaySec = delaySec;
        this.delaySoundOn = delaySoundOn;        
        this.count = count;
        this.countSoundOn = countSoundOn;
    }

    setPhases(number) {
        this.phases = this.phases.slice(0, number);
        for (var index = 0; index < number; index++) {
            if (!this.phases[index]) {
                this.phases[index] = new Phase(index, 1);
            }

        }
        this.phases.push()
    }

    truncate(number) {
        this.phases = this.phases.slice(0, number)
    }
}

export class Phase {

    constructor(id, durationSec, soundOn = true) {
        this.id = id;
        this.durationSec = durationSec;
        this.soundOn = soundOn;
    }
}

export class PhaseView extends Phase {

    constructor(id, durationSec, soundOn = true, isDelayPhase = false) {
        super(id, durationSec, soundOn);
        this.countDown = durationSec;
        this.isDelayPhase = isDelayPhase;
    }

    get hasFinished() {
        return this.countDown == 0;
    }
    
    get counter() {
        return this.durationSec-this.countDown;
    }

    nextTick() {
        if (this.hasFinished) return;
        this.countDown -= 1;
    }
    
    repeat()
    {
        this.countDown = this.durationSec;
    }
}

export class ExerciseView {

    constructor(exercise, soundOn = true) {
        this.name = exercise.name;
        this.count = 0;
        this.countDown = exercise.count;
        this.delaySoundOn = exercise.delaySoundOn;        
        this.countSoundOn = exercise.countSoundOn;
        this.soundOn = soundOn;
        
        this.totalSec = 0;
        this.repeatSec = 0;                
        this.repeatDurationSec = 0;
        this.phaseViews = [];        
        exercise.phases.forEach(function (phase) {            
            this.phaseViews[phase.id] = new PhaseView(phase.id, phase.durationSec, phase.soundOn, false);
            this.repeatDurationSec += phase.durationSec;
        }, this);
        
        this.repeatCountDownSec = this.repeatDurationSec;
                
        if (exercise.delaySec>0)
        {
            this.deleayPhaseView = new PhaseView(-1, exercise.delaySec, exercise.delaySoundOn, true);
            this.current = this.deleayPhaseView;
        } else {
            this.current = this.phaseViews[0];    
        }
    }

    nextTick() {
        if (this.hasFinished) return;
        
       if (!this.current.hasFinished) {
            this.current.nextTick();
            this.incrementTime();
        }
        
        if (!this.current.hasFinished) return;
                
        if (this.current.hasFinished) {            
            if (this.current.id == (this.phaseViews.length - 1)) {
                this.repeat();            
                return;
            }            
        }            

        if (this.soundOn && this.current.soundOn)
        {
            if (this.current.isDelayPhase)
            {
                Sounds.start();    
            } else {
                Sounds.beep();
            }
        }        
        this.current = this.phaseViews[this.current.id + 1];
    }

    // get repeatFinished() {
    //     return this.current 
    //             && (this.current.id == (this.phaseViews.length - 1))
    //             && (this.current.hasFinished());
    // }

    get hasFinished() {
        return !this.current  || (this.countDown == 0);
    }

    repeat() {
        
        this.count++;
        this.countDown--;
        if (this.countDown > 0) {
            this.phaseViews.forEach(function (phase) {
                phase.repeat();
            }, this);
            this.current = this.phaseViews[0];
            this.repeatSec = 0;
            this.repeatCountDownSec = this.repeatDurationSec;
            if (this.soundOn && this.countSoundOn)
            {
                Sounds.start();
            }
            return;
        }        
        this.current = null;
        if (this.soundOn && this.countSoundOn)
        {
            Sounds.stop();
        }
    }
    
    incrementTime()
    {
        if (this.isDelayPhase) return;
        this.totalSec++;
        this.repeatSec++;      
        this.repeatCountDownSec--;          
    }
    
    get isDelayPhase(){
        return this.current && (this.current === this.deleayPhaseView);
    }
}
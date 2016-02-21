export class Exercise {

    constructor(name, phases = [], delaySec, count) {
        this.name = name;
        this.phases = phases;
        this.delaySec = delaySec;
        this.count = count;
    }

    setPhases(number) {
        this.phases = this.phases.slice(0, number - 1);
        for (var index = 0; index < number; index++) {
            if (!this.phases) {
                this.phases[index] = new Phase(index, 1);
            }

        }
        this.phases.push()
    }

    truncate(number) {
        this.phases = this.phases.slice(0, number - 1)
    }
}

export class Phase {

    constructor(id, durationSec) {
        this.id = id;
        this.durationSec = durationSec;
    }
}

export class PhaseView extends Phase {

    constructor(id, durationSec) {
        super(id, durationSec);
        this.countDown = durationSec;
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

    constructor(exercise) {
        this.name = exercise.name;
        this.count = 0;
        this.countDown = exercise.count;
        this.totalSec = 0;
        this.repeatSec = 0;                
        this.repeatDurationSec = 0;
        this.phaseViews = [];
        exercise.phases.forEach(function (phase) {            
            this.phaseViews[phase.id] = new PhaseView(phase.id, phase.durationSec);
            this.repeatDurationSec += phase.durationSec;
        }, this);
        
        this.repeatCountDownSec = this.repeatDurationSec;
                
        if (exercise.delaySec>0)
        {
            this.deleayPhaseView = new PhaseView(-1, exercise.delaySec);
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
            return;
        }        
        this.current = null;
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
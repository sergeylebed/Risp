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
}

export class ExerciseView {

    constructor(exercise) {
        this.name = exercise.name;
        this.count = exercise.count;
        this.current = new PhaseView(-1, exercise.delaySec);
        this.phaseViews = [];
        exercise.phases.forEach(function (phase) {            
            this.phaseViews[phase.id] = new PhaseView(phase.id, phase.durationSec);
        }, this);
    }

    nextTick() {
        if (this.hasFinished) return;
        if (!this.current.hasFinished) {
            this.current.nextTick();
            return;
        }
        if (this.current.id == (this.phaseViews.length - 1)) {
            this.current = null;
            return;
        }
        this.current = this.phaseViews[this.current.id + 1];
    }

    get hasFinished() {
        return (!this.current);
    }
}
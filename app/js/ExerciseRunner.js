
import { createStore } from 'redux';

export class ExerciseRunner {

    constructor(exercise, runInterval = 1000) {
        this.runInterval = runInterval;
        this.exercise = exercise;
        this.enabled = false;
    }
     
    get isNotCreated() {
        return this.storage === undefined;
    }
    
    get getStore() {
        return this.storage;
    }
    
    play() {
        if (this.isNotCreated) {
            this.storage = this._createStorage();
            this._enableTimer();
            this.enabled = true;
        } else {
            this.resume();
        }
        
    }

    get canPlay(){
        return !this.enabled  && this.isNotCreated;
    }

    pause() {
        if (this.isNotCreated) return;
        this.enabled = false;
        this._disableTimer();
    }

    get canPause(){
        return this.enabled && !this.isNotCreated;
    }
    
    resume() {
        if (this.isNotCreated) return;
        this.enabled = true;
        this._enableTimer();
    }

    get canResume(){
        return !this.enabled && !this.isNotCreated;
    }

    stop() {
        if (this.isNotCreated) return;
        this.enabled = false;
        this._disableTimer();
        this.storage = undefined;
    }

    get canStop(){
        return !this.isNotCreated;
    }
    
    tick() {        
        if (!this.enabled) return;
    }
    
    _createStorage()
    {
        return createStore(function() {}, 
            { 
                exercise : this.exercise,
                currentPhase: 0,
                currentTick: 0,   
            }); 
    }
    
    _enableTimer()
    {
        if (this.interval) return;
        this.interval = setInterval(this.tick, this.runInterval);
    }
    
    _disableTimer()
    {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = undefined;
        }        
    }
}
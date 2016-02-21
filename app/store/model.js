import { Exercise, Phase} from '../js/Exercise'; 

export class Risp {
    
    constructor(exercise, settings)
    {        
        this.currentExercise = exercise
            || new Exercise(
                'New exercise', 
                [
                    new Phase(0, 4), 
                    new Phase(1, 4)
                ], 
                3,
                10);
        this.settings =  settings || new Settings(true);                                  
    }       
}


export class Settings {
    constructor(soundOn = true)
    {
        this.soundOn = soundOn;
    }
}
export const ActionType = {
    
    Exercise:
    {        
        Reset: 'Exercise.Reset',
        setDelay: 'Exercise.setDelay',
        setCount: 'Exercise.setCount',
        setPhase: 'Exercise.setPhase',
        setPhases: 'Exercise.setPhases',
        setDelaySound : 'Exercise.setDelaySound',
        setCountSound : 'Exercise.setCountSound',
        setPhaseSound : 'Exercise.setPhaseSound'
    },
    
    Settings: {
        setSound: 'Settings.setSound'
    }
}

export class SettingsActions
{
    static setSound(soundOn) {
        return {
            type: ActionType.Settings.setSound,
            soundOn: soundOn
        }
    }

}

export class ExerciseActions
{
    static setDelay(delaySec) {
        return {
            type: ActionType.Exercise.setDelay,
            delaySec: delaySec
        }
    }

    static setCount(count) {
        return {
            type: ActionType.Exercise.setCount,
            count: count
        }
    }

    static setPhases(number) {
        return {
            type: ActionType.Exercise.setPhases,
            number: number
        }
    }
    
    static setPhase(id, durationSec) {
        return {
            type: ActionType.Exercise.setPhase,
            id: id,
            durationSec: durationSec
        }
    }
    
    static setDelaySound(soundOn) {
        return {
            type: ActionType.Exercise.setDelaySound,
            delaySoundOn: soundOn
        }
    }

    static setCountSound(soundOn) {
        return {
            type: ActionType.Exercise.setCountSound,
            countSoundOn: soundOn
        }
    }    
    
    static setPhaseSound(id, soundOn) {
        return {
            type: ActionType.Exercise.setPhaseSound,
            id: id,
            soundOn: soundOn
        }
    }           
}
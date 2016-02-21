export const ActionType = {
    
    Exercise:
    {        
        Reset: 'Exercise.Reset',
        setDelay: 'Exercise.setDelay',
        setCount: 'Exercise.setCount',
        setPhase: 'Exercise.setPhase',
        setPhases: 'Exercise.setPhases',
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
}
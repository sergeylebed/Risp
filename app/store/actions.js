export const ActionType = {
    setCurrentExercise: 'setCurrent',
    resetCurrentExercise: 'resetCurrent'
}

export function setCurrentExercise(exercise) {
    return {
        type: ActionType.setCurrentExercise,
        exercise
    }
}

export function resetCurrentExercise() {
    return {
        type: ActionType.resetCurrentExercise        
    }
}
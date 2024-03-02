import {TaskStateType} from "../App";
export type RemoveTaskActionsType = {
    type: 'REMOVE-TASK',
    todolistId: string,
    taskId: string
}
export type Actions2Type = {
    type: '2',
    title: string
}
type ActionsType = RemoveTaskActionsType | Actions2Type
export const tasksReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            stateCopy[action.todolistId] = tasks.filter(t => t.id != action.taskId)
            return stateCopy
        }
        case "2": {
            return {...state}
        }

        default:
            throw new Error('error')
    }

}
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionsType => {
    return {type: "REMOVE-TASK", todolistId, taskId}
}
export const addTodolistAC = (title: string): Actions2Type => {
    return {type: "2", title: title}
}
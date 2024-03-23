import {TaskStateType} from "../../App";

export type RemoveTaskActionsType = {
    type: 'REMOVE-TASK',
    todolistId: string,
    taskId: string
}
export type AddTodolistType = {
    type: 'ADD_TODOLIST',
    title: string
    todolistId: string
}
export type ChangeTaskStatusType = {
    type: 'CHANGE_TASK_STATUS',
    id: string
    isDone: boolean
    todolistId: string
}
export type ChangeTaskTitleType = {
    type: 'CHANGE_TASK_TITLE',
    id: string
    newTitle: string
    todolistId: string
}
export type AddTaskType = {
    type: 'ADD_TASK',
    title: string
    todolistId: string
}
export type RemoveTodolistType = {
    type: 'REMOVE_TODOLIST',
    title: string
    id: string
}

type ActionsType =
    RemoveTaskActionsType
    | AddTaskType
    | AddTodolistType
    | ChangeTaskStatusType
    | ChangeTaskTitleType
    | RemoveTodolistType

export const tasksReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            stateCopy[action.todolistId] = tasks.filter(t => t.id != action.taskId)
            return stateCopy
        }
        case 'CHANGE_TASK_STATUS': {
            return {...state}
        }
        case 'ADD_TASK': {
            return {...state}
        }
        case 'CHANGE_TASK_TITLE': {
            return {...state}
        }

        case "ADD_TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case 'REMOVE_TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }

        default:
            throw new Error('error')
    }

}
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionsType => {
    return {type: "REMOVE-TASK", todolistId, taskId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskType => {
    return {type: "ADD_TASK", title, todolistId}
}
export const changeStatusAC = (id: string, isDone: boolean, todolistId: string): ChangeTaskStatusType => {
    return {type: "CHANGE_TASK_STATUS", id, isDone, todolistId}
}
export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string): ChangeTaskTitleType => {
    return {type: "CHANGE_TASK_TITLE", id, newTitle, todolistId}
}




import {TaskStateType, TodolistType} from "../../App";
import {AddTodolistAC, todolistsReducer} from "./todolists_reducer_2";

test('ids should be eguals', () => {
    const startTaskState: TaskStateType = {}
    const startTodolistsState: Array<TodolistType> = []

    const action = AddTodolistAC('new todo')

    const endTasksState = todolistsReducer(startTaskState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)
})


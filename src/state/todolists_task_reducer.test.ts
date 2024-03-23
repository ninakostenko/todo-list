import {TaskStateType, TodolistType} from "../App";
import {addTodolistAC, todolistsReducer} from "./todolists/todolists-reduser";

test('ids should be eguals', () => {
    const startTaskState: TaskStateType = {}
    const startTodolistsState: Array<TodolistType> = []

    const action = addTodolistAC('new todo')

    // const endTasksState = tasksReducer(startTaskState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    // const keys = Object.keys(endTasksState)
    // const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    // expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)
})


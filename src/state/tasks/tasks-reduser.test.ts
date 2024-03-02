import {TaskStateType} from "../App";

import {removeTaskAC, tasksReducer} from "./tasks-reduser";


test('correct task should be deleted from correct array', () => {
    const startState: TaskStateType = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
        ],
        "todolistId2": [
            {id: "1", title: "Red", isDone: true},
            {id: "2", title: "Blue", isDone: true},
            {id: "3", title: "Orange", isDone: false},
        ]
    }
    const action = removeTaskAC("2", "todolistId2")

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t => t.id != "2")).toBeTruthy()
})


import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType} from "./AddOneTodolistApp";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterType
}

export function Todolist(props: PropsType) { //f6 бистрий експорт
    const [newTitle, setNewTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode == 13) {
            props.addTask(newTitle)
            setNewTitle("")
        }
    }
    const addTask = () => {
        if (newTitle.trim() !== '') {
            props.addTask(newTitle.trim())
            setNewTitle("")
        } else {
            setError('Tile is required')
        }

    }
    const onAllClick = () => props.changeFilter("all")
    const onActiveClick = () => props.changeFilter("active")
    const onCompletedClick = () => props.changeFilter("completed")


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text"
                       value={newTitle}
                       onChange={onChangeTitleHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ''}
                />
                <button onClick={addTask}>+
                </button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map((t) => {
                        const onRemoveHandler = () => props.removeTask(t.id)
                        const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked)
                        }
                        return (
                            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <input type="checkbox"
                                       onChange={onChangeCheckboxHandler}
                                       checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={onRemoveHandler}>X</button>
                            </li>
                        )
                    }
                )}
            </ul>

            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={onAllClick}>All</button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClick}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClick}>Completed
                </button>
            </div>
        </div>
    )
}
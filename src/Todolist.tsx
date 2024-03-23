import React, {ChangeEvent} from "react";
import {AddItemForm} from "./component/AddItemForm";
import {FilterType} from "./addOneTodo/AddOneTodolistApp";
import {EditableSpan} from "./component/EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void

}

function Delete() {
    return null;
}

function DeleteIcon() {
    return null;
}

export function Todolist(props: PropsType) { //f6 бистрий експорт
    const onAllClick = () => props.changeFilter("all", props.id)
    const onActiveClick = () => props.changeFilter("active", props.id)
    const onCompletedClick = () => props.changeFilter("completed", props.id)
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                {/*<button onClick={removeTodolist}>X</button>*/}
                {/*<IconButton aria-label="delete" onClick={removeTodolist} color={'success'}>*/}
                {/*    <Delete/>*/}
                {/*</IconButton>*/}
                <Button variant="outlined" onClick={removeTodolist} color="secondary">X</Button>
            </h3>

            <AddItemForm addItem={addTask}/>
            <div>
                {props.tasks.map((t) => {
                        const onRemoveHandler = () => props.removeTask(t.id, props.id)
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }
                        return (
                            <div key={t.id} className={t.isDone ? "is-done" : ""}>
                                <Checkbox
                                    color="secondary"
                                    onChange={onChangeStatusHandler}
                                    checked={t.isDone}/>
                                <EditableSpan title={t.title}
                                              onChange={onChangeTitleHandler}
                                />
                                {/*<button onClick={onRemoveHandler}>X</button>*/}
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={onRemoveHandler}
                                >x</Button>
                            </div>
                        )
                    }
                )}
            </div>

            <div>
                <Button variant={props.filter === "all" ? "contained" : "text"}
                    // className={props.filter === "all" ? "active-filter" : ""}
                        onClick={onAllClick}>All
                </Button>
                <Button color={'secondary'} variant={props.filter === "active" ? "contained" : "text"}
                        onClick={onActiveClick}>Active
                </Button>
                <Button color={'primary'} variant={props.filter === "completed" ? "contained" : "text"}
                        onClick={onCompletedClick}>Completed
                </Button>
            </div>
        </div>
    )
}




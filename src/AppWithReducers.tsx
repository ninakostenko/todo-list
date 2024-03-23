import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./component/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import RouterApp from "./router/RouterApp";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists/todolists-reduser";
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks/tasks-reduser";


export type FilterType = "all" | "completed" | "active"
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function MenuIcon() {
    return null;
}

function AppWithReducers() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, dispatchTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to by", filter: "all"}
    ])
    let [tasksObj, dispatchTaskReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "Angular", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Red", isDone: true},
            {id: v1(), title: "Blue", isDone: true},
            {id: v1(), title: "Orange", isDone: false},
        ]
    })


    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId)
        dispatchTaskReducer(action)
    }

    function addTask(title: string, todolistId: string) {
        dispatchTodolistsReducer(addTaskAC(title, todolistId))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatchTaskReducer(changeStatusAC(id, isDone, todolistId))
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatchTaskReducer(changeTaskTitleAC(id, newTitle, todolistId))
    }

    function changeFilter(value: FilterType, id: string) {
        dispatchTodolistsReducer(changeTodolistFilterAC(value, id))
    }

    let removeTodolist = (id: string) => {
        const action = removeTodolistAC(id)
        dispatchTodolistsReducer(action)
        dispatchTaskReducer(action)
    }

    function changeTodolistTitle(id: string, title: string) {
        dispatchTodolistsReducer(changeTodolistTitleAC(id, title))
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatchTaskReducer(action)
        dispatchTodolistsReducer(action)
    }


    return (
        <div className="App">

            <RouterApp/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5} style={{padding: '20px'}}>
                    {todolists.map((tl) => {
                        let taskForTodo = tasksObj[tl.id]
                        if (tl.filter === "completed") {
                            taskForTodo = taskForTodo.filter(t => t.isDone === true)
                        }
                        if (tl.filter === "active") {
                            taskForTodo = taskForTodo.filter(t => t.isDone === false)
                        }
                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={taskForTodo}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithReducers;

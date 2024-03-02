import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./component/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import RouterApp from "./router/RouterApp";


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

function App() {
    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTask = tasks.filter((t) => t.id !== id)
        tasksObj[todolistId] = filteredTask
        setTasksObj({...tasksObj})
    }
    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todolistId]
        let newTasks = [task, ...tasks]
        tasksObj[todolistId] = newTasks

        setTasksObj({...tasksObj})
    }
    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        //дотанем нужный массив по todolistId
        let tasks = tasksObj[todolistId]
        //найдем нужную таску
        let task = tasks.find(t => t.id === taskId)
        // изменим таску если она нашлась
        if (task) {
            task.isDone = isDone
            // засетаем в стейт копиюобьекта, чтобы реакт отреагировал перерисовкой
            setTasksObj({...tasksObj})
        }
    }
    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        //дотанем нужный массив по todolistId
        let tasks = tasksObj[todolistId]
        //найдем нужную таску
        let task = tasks.find(t => t.id === taskId)
        // изменим таску если она нашлась
        if (task) {
            task.title = newTitle
            // засетаем в стейт копиюобьекта, чтобы реакт отреагировал перерисовкой
            setTasksObj({...tasksObj})
        }
    }

    
    function changeFilter(value: FilterType, id: string) {
        let todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to by", filter: "all"},
    ])
    let removeTodolist = (id: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== id)
        setTodolists(filteredTodolist)

        delete tasksObj[todolistId1]
        setTasksObj({...tasksObj})
    }

    function changeTodolistTitle(id: string, title: string) {
        const todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = title
            setTodolists([...todolists])
        }
    }

    let [tasksObj, setTasksObj] = useState<TaskStateType>({
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

    function addTodolist(title: string) {
        let todolist: TodolistType = {
            id: v1(),
            title: title,
            filter: 'all'

        }
        setTodolists([todolist, ...todolists])
        setTasksObj({...tasksObj, [todolist.id]: []})
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

export default App;

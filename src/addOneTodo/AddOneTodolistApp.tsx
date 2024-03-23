import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./addOneTodolist";
import {v1} from "uuid";

export type FilterType = "all" | "completed" | "active"

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "Angular", isDone: false},
    ])
    const [filter, setFilter] = useState<FilterType>("all")

    function removeTask(id: string) {
        let filteredTask = tasks.filter((t) => t.id !== id)
        setTasks(filteredTask)
    }

    function changeFilter(value: FilterType) {
        setFilter(value)
    }

    let taskForTodo = tasks
    if (filter === "completed") {
        taskForTodo = tasks.filter(t => t.isDone === true)
    }
    if (filter === "active") {
        taskForTodo = tasks.filter(t => t.isDone === false)
    }

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
        // setTasks([newTask, ...tasks])
    }
    function changeCheckbox (taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }


    return (
        <div className="App">
            <Todolist title={"What to learn"}
                      tasks={taskForTodo}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeCheckbox}
                      filter={ filter}
            />
        </div>
    );
}

export default App;

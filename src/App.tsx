import React, {useState} from 'react';
import {Todolist} from './components/Todolist';
import './App.css'
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksType = {
    [key: string]: TaskType[]
}

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type FilterType = 'all' | 'active' | 'completed'

export function App() {

    const todolistID1 = v1()
    const todolistID2 = v1()

    const [tasks, setTasks] = useState<TasksType>({
            [todolistID1]: [
                {id: v1(), title: 'React', isDone: false},
                {id: v1(), title: 'HTML', isDone: true},
                {id: v1(), title: 'CSS', isDone: true},
                {id: v1(), title: 'SCSS', isDone: false},
            ],
            [todolistID2]: [
                {id: v1(), title: 'Remark', isDone: false},
                {id: v1(), title: 'Stendal', isDone: true},
                {id: v1(), title: 'Bykov', isDone: false},
                {id: v1(), title: 'Conan Doyle', isDone: false},
            ],

        }
    )

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to read', filter: 'all'},
    ])

    const removeTask = (taskId: string, todolistID: string) => {
        tasks[todolistID] = tasks[todolistID].filter(t => t.id !== taskId)
        setTasks({...tasks})
    }

    const addTask = (title: string, todolistID: string) => {
        const task: TaskType = {id: v1(), title: title, isDone: false};
        tasks[todolistID] = [task, ...tasks[todolistID]]
        setTasks({...tasks})
    }

    const changeFilter = (filter: FilterType, todolistID: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, filter: filter} : tl))
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistID: string) => {
        tasks[todolistID] = tasks[todolistID].map(t => t.id === taskId ? {...t, isDone: taskStatus} : t)
        setTasks({...tasks})
    }

    const addTodolist = (title: string) => {
        const newTodolist: TodolistType = {
            id: v1(),
            title: title,
            filter: 'all',
        }
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [newTodolist.id]: []})

    }

    const editTaskTitle = (newTitle: string, todolistId: string, taskId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: newTitle} : t)
        })
    }

    const editTodolistTitle = (newTitle: string, todolistId: string) => {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, title: newTitle} : t))
    }

    return (
        <div className={'App'}>
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(tl => {

                    let tasksForTodolist: TaskType[] = []

                    switch (tl.filter) {
                        case 'all':
                            tasksForTodolist = tasks[tl.id]
                            break;
                        case 'active' :
                            tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
                            break
                        case 'completed':
                            tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
                            break
                    }

                    return <Todolist title={tl.title}
                                     key={tl.id}
                                     todolistID={tl.id}
                                     tasks={tasksForTodolist}
                                     removeTask={removeTask}
                                     addTask={addTask}
                                     changeFilter={changeFilter}
                                     changeTaskStatus={changeTaskStatus}
                                     filter={tl.filter}
                                     editTaskTitle={editTaskTitle}
                                     editTodolistTitle={editTodolistTitle}
                    />
                })
            }

        </div>
    );
}
import React, {useState} from 'react';
import {Todolist} from './components/Todolist';
import './App.css'
import {v1} from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

export function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'SCSS', isDone: false},
    ])

    let [filter, setFilter] = useState<FilterType>('all')


    const removeTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id))
    }

    const addTask = (title: string) => {
        const task: TaskType = {id: v1(), title: title, isDone: false};
        setTasks([task, ...tasks])
    }

    const changeFilter = (filter: FilterType) => {
        setFilter(filter)
    }

    let tasksForTodolist: TaskType[] = []

    switch (filter) {
        case 'all':
            tasksForTodolist = tasks
            break;
        case 'active' :
            tasksForTodolist = tasks.filter(t => !t.isDone);
            break
        case 'completed':
            tasksForTodolist = tasks.filter(t => t.isDone);
            break
    }

    return (
        <div className={'App'}>
            <Todolist title={'What to learn'}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}



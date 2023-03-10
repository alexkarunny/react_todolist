import React, {useState} from 'react';
import {Todolist} from './components/Todolist';
import './App.css'

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

export function App() {

    let [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'React', isDone: false},
        {id: 2, title: 'HTML', isDone: true},
        {id: 3, title: 'CSS', isDone: true},
        {id: 4, title: 'SCSS', isDone: false},
    ])

    let [filter, setFilter] = useState<FilterType>('all')


    const removeTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id))
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
            <Todolist title={'What to learn'} tasks={tasksForTodolist} removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}



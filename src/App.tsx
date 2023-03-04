import React from 'react';
import {Todolist} from './components/Todolist';
import './App.css'

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export function App() {

    const tasks1 = [
        {id: 1, title: 'React', isDone: false},
        {id: 2, title: 'HTML', isDone: true},
        {id: 3, title: 'CSS', isDone: false},
        {id: 4, title: 'SCSS', isDone: false},
    ]

    const tasks2 = [
        {id: 1, title: 'HP and the philosopher\'s stone', isDone: true},
        {id: 2, title: 'HP and the chamber of secrets', isDone: false},
        {id: 3, title: 'HP and the prisoner of Azkaban', isDone: false},
        {id: 4, title: 'HP and the goblet of fire', isDone: false},
    ]
    return (
        <div className={'App'}>
            <Todolist title={'What to learn'} tasks={tasks1}/>
            <Todolist title={'What to read'} tasks={tasks2}/>
        </div>
    );
}



import React from 'react';
import {FilterType, TaskType} from '../App';

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: number) => void
    changeFilter: (filter: FilterType) => void
}

export function Todolist(props: TodolistPropsType) {

    const removeTaskHandler = (id: number) => {
        props.removeTask(id)
    }

    const changeFilterHandler = (filter: FilterType) => {
        props.changeFilter(filter)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>

                {props.tasks.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone} onChange={() => {
                    }}/> <span>{t.title} </span>
                    <button onClick={() => removeTaskHandler(t.id)}>x</button>
                </li>)
                }

            </ul>
            <div>
                <button onClick={() => changeFilterHandler('all')}>All</button>
                <button onClick={() => changeFilterHandler('active')}>Active</button>
                <button onClick={() => changeFilterHandler('completed')}>Completed</button>
            </div>
        </div>
    )
}
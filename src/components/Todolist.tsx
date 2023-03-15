import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterType, TaskType} from '../App';

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (filter: FilterType) => void
    addTask: (title: string) => void
}

export function Todolist(props: TodolistPropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState<string>('')

    const changeFilterHandler = (filter: FilterType) => {
        props.changeFilter(filter)
    }
    const onClickAddTaskHandler = () => {
        if (newTaskTitle) {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }

    const onChangeAddTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyUpAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter' && e.ctrlKey && newTaskTitle) {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input onChange={onChangeAddTaskTitleHandler} value={newTaskTitle} onKeyUp={onKeyUpAddTaskHandler}/>
                <button onClick={onClickAddTaskHandler}>+</button>
            </div>
            <ul>

                {props.tasks.map(t => {
                        const removeTaskHandler = () => {
                            props.removeTask(t.id)
                        }
                        return <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title} </span>
                            <button onClick={removeTaskHandler}>x</button>
                        </li>
                    })
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
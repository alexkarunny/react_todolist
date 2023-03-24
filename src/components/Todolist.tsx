import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterType, TaskType} from '../App';
import '../App.css'

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistID: string) => void
    changeFilter: (filter: FilterType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (id: string, taskStatus: boolean, todolistID: string) => void
    filter: FilterType
    todolistID: string
}

export function Todolist(props: TodolistPropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const changeFilterHandler = (filter: FilterType) => {
        props.changeFilter(filter, props.todolistID)
    }
    const onClickAddTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim(), props.todolistID)
            setNewTaskTitle('')
        } else {
            setError('Title is require')
        }
    }

    const onChangeAddTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyUpAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter' && e.ctrlKey && newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle, props.todolistID)
            setNewTaskTitle('')
        } else if (e.code === 'Enter' && e.ctrlKey && newTaskTitle.trim() === '') {
            setError('Title is require')
        }
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input onChange={onChangeAddTaskTitleHandler} value={newTaskTitle} onKeyUp={onKeyUpAddTaskHandler}
                       className={error ? 'error' : ''}/>
                <button onClick={onClickAddTaskHandler}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>

                {props.tasks.map(t => {
                    const removeTaskHandler = () => {
                        props.removeTask(t.id, props.todolistID)
                    }
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistID)
                    }
                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type="checkbox" checked={t.isDone} onChange={changeTaskStatus}/>
                        <span>{t.title} </span>
                        <button onClick={removeTaskHandler}>x</button>
                    </li>
                })
                }

            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={() => changeFilterHandler('all')}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={() => changeFilterHandler('active')}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={() => changeFilterHandler('completed')}>Completed
                </button>
            </div>
        </div>
    )
}
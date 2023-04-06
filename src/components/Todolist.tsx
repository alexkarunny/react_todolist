import React, {ChangeEvent} from 'react';
import {FilterType, TaskType} from '../App';
import '../App.css'
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistID: string) => void
    changeFilter: (filter: FilterType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (id: string, taskStatus: boolean, todolistID: string) => void
    editTaskTitle: (newTitle: string, todolistId: string, taskId: string) => void
    filter: FilterType
    todolistID: string
    editTodolistTitle: (newTitle: string, todolistId: string) => void
}

export function Todolist(props: TodolistPropsType) {

    const changeFilterHandler = (filter: FilterType) => {
        props.changeFilter(filter, props.todolistID)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.todolistID)
    }
    const editTodolistTitle = (title: string) => {
        props.editTodolistTitle(title, props.todolistID)
    }

    return (
        <div>
            <EditableSpan title={props.title} changeTaskTitle={editTodolistTitle}/>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map(t => {
                    const changeTaskTitle = (title: string) => {
                        props.editTaskTitle(title, props.todolistID, t.id)
                    }
                    const removeTaskHandler = () => {
                        props.removeTask(t.id, props.todolistID)
                    }
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistID)
                    }
                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type="checkbox" checked={t.isDone} onChange={changeTaskStatus}/>
                        <EditableSpan title={t.title} changeTaskTitle={changeTaskTitle}/>
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


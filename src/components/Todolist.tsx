import React, {ChangeEvent} from 'react';
import {FilterType, TaskType} from '../App';
import '../App.css'
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton, List, ListItem, Paper, Typography} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


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

        <div className={'todolist'}>
            <Typography
                variant={'h5'}
                align={'center'}
                fontWeight={'bold'}
                gutterBottom
            ><EditableSpan title={props.title} changeTaskTitle={editTodolistTitle}/>
                <IconButton
                    size={'small'}
                    onClick={() => {
                    }}  //дописать удаление тудулиста
                >
                    <HighlightOffIcon/>
                </IconButton></Typography>
            <AddItemForm addItem={addTask}/>
            <List>
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
                    return <ListItem
                        key={t.id}
                        className={t.isDone ? 'is-done' : ''}
                        divider
                        disablePadding
                        secondaryAction={
                            <IconButton
                                size={'small'}
                                onClick={removeTaskHandler}
                            >
                                <HighlightOffIcon/>
                            </IconButton>
                        }
                    >
                        <Checkbox
                            edge={'start'}
                            size={'small'}
                            checked={t.isDone} onChange={changeTaskStatus}
                        />
                        <EditableSpan title={t.title} changeTaskTitle={changeTaskTitle}/>
                    </ListItem>
                })
                }
            </List>
            <div className={'btn-filter-container'}>
                <Button variant={'contained'} size={'small'}
                        color={props.filter === 'all' ? 'secondary' : 'primary'}
                        onClick={() => changeFilterHandler('all')}>All
                </Button>
                <Button variant={'contained'} size={'small'}
                        color={props.filter === 'active' ? 'secondary' : 'primary'}
                        onClick={() => changeFilterHandler('active')}>Active
                </Button>
                <Button variant={'contained'} size={'small'}
                        color={props.filter === 'completed' ? 'secondary' : 'primary'}
                        onClick={() => changeFilterHandler('completed')}>Completed
                </Button>
            </div>
        </div>
    )
}


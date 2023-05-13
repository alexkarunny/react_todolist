import React, {memo, useCallback, useMemo} from 'react';
import {FilterType, TaskType} from '../App';
import '../App.css'
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton, List, Typography} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {Task} from '../Task';


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
    removeTodolistCallback: (todolistId: string) => void
}

export const Todolist = memo((props: TodolistPropsType) => {
    const allFilterHandler = useCallback(() => {
        props.changeFilter('all', props.todolistID)
    }, [props.changeFilter, props.todolistID])
    const activeFilterHandler = useCallback(() => {
        props.changeFilter('active', props.todolistID)
    }, [props.changeFilter, props.todolistID])
    const completedFilterHandler = useCallback(() => {
        props.changeFilter('completed', props.todolistID)
    }, [props.changeFilter, props.todolistID])


    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolistID)
    }, [props.addTask, props.todolistID])

    const editTodolistTitle = useCallback((title: string) => {
        props.editTodolistTitle(title, props.todolistID)
    }, [props.editTodolistTitle, props.todolistID])

    const removeTodolistHandler = () => {
        props.removeTodolistCallback(props.todolistID)
    }

    let tasksForTodolist: TaskType[] = []

    useMemo(() => {
        switch (props.filter) {
            case 'all':
                tasksForTodolist = props.tasks
                break;
            case 'active' :
                tasksForTodolist = props.tasks.filter(t => !t.isDone);
                break
            case 'completed':
                tasksForTodolist = props.tasks.filter(t => t.isDone);
                break
        }
        console.log(`useMemo : ${tasksForTodolist}`)
        return tasksForTodolist
    }, [props.filter, props.tasks])


    const changeTaskTitle = useCallback((newTitle: string, taskId: string) => {
        props.editTaskTitle(newTitle, props.todolistID, taskId)
    }, [props.editTaskTitle, props.todolistID])

    const removeTaskHandler = useCallback((taskId: string) => {
        props.removeTask(taskId, props.todolistID)
    }, [props.removeTask, props.todolistID])
    const changeTaskStatus = useCallback((taskId: string, taskStatus: boolean) => {
        props.changeTaskStatus(taskId, taskStatus, props.todolistID)
    }, [props.changeTaskStatus, props.todolistID])

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
                    onClick={removeTodolistHandler}  //дописать удаление тудулиста
                >
                    <HighlightOffIcon/>
                </IconButton></Typography>
            <AddItemForm addItem={addTask}/>
            <List>
                {tasksForTodolist.map(t => {

                    return <Task key={t.id}
                                 task={t}
                                 changeTaskStatus={changeTaskStatus}
                                 removeTask={removeTaskHandler}
                                 editTaskTitle={changeTaskTitle}


                    />
                })
                }
            </List>
            <div className={'btn-filter-container'}>
                {/*                <Button variant={'contained'} size={'small'}
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
                </Button>*/}
                <ButtonWithMemo title={'All'} onClick={allFilterHandler}
                                color={props.filter === 'all' ? 'secondary' : 'primary'} variant={'contained'}
                                size={'small'}/>
                <ButtonWithMemo title={'Active'} onClick={activeFilterHandler}
                                color={props.filter === 'active' ? 'secondary' : 'primary'} variant={'contained'}
                                size={'small'}/>
                <ButtonWithMemo title={'Completed'} onClick={completedFilterHandler}
                                color={props.filter === 'completed' ? 'secondary' : 'primary'} variant={'contained'}
                                size={'small'}/>


            </div>
        </div>
    )
})

type ButtonWithMemoPropsType = {
    title: string
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    variant: 'text' | 'outlined' | 'contained'
    size: 'small' | 'medium' | 'large'
    onClick: () => void
}

export const ButtonWithMemo = memo((props: ButtonWithMemoPropsType) => {
    console.log('button')
    return <Button variant={props.variant}
                   size={props.size}
                   color={props.color}
                   onClick={props.onClick}>{props.title}
    </Button>
})
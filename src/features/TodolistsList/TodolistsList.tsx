import React, {memo, useCallback, useEffect} from 'react';
import {createTask, deleteTask, ModelDomainType, updateTask} from './tasks-reducers';
import {
    changeTodolistFilterAC,
    changeTodolistTitle,
    createTodolist,
    deleteTodolist,
    fetchTodolists,
    FilterType
} from './todolists-reducers';
import {TaskStatusType} from '../../api/todolists-api';
import {Grid, Paper} from '@mui/material';
import {AddItemForm} from '../../components/addItemForm/AddItemForm';
import {Todolist} from './Todolist/Todolist';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {Navigate} from 'react-router-dom';

type TodolistsPropsType = {}

export const TodolistsList: React.FC<TodolistsPropsType> = memo((props) => {
    const tasks = useAppSelector(state => state.tasks)
    const todolists = useAppSelector(state => state.todolists)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(fetchTodolists())
    }, [])

    const removeTask = useCallback((taskId: string, todolistID: string) => {
        dispatch(deleteTask(todolistID, taskId))
    }, [dispatch])
    const addTask = useCallback((title: string, todolistID: string) => {
        dispatch(createTask(todolistID, title))
    }, [dispatch])
    const changeFilter = useCallback((filter: FilterType, todolistID: string) => {
        dispatch(changeTodolistFilterAC(todolistID, filter))
    }, [dispatch])
    const switchTaskStatus = useCallback((todolistID: string, taskId: string, taskStatus: boolean) => {
        const model: ModelDomainType = {status: taskStatus ? TaskStatusType.Completed : TaskStatusType.New}
        dispatch(updateTask(todolistID, taskId, model))
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolist(title))
    }, [dispatch])
    const editTaskTitle = useCallback((newTitle: string, todolistId: string, taskId: string) => {
        dispatch(updateTask(todolistId, taskId, {title: newTitle}))
    }, [dispatch])
    const editTodolistTitle = useCallback((newTitle: string, todolistId: string) => {
        dispatch(changeTodolistTitle(todolistId, newTitle))
    }, [dispatch])
    const removeTodolist = useCallback((todolistId: string) => {
        return dispatch(deleteTodolist(todolistId));
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <Grid container sx={{p: '15px 0'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={4}>
                {
                    todolists.map(tl => {
                        return (
                            <Grid item key={tl.id}>
                                <Paper elevation={3}>
                                    <Todolist title={tl.title}
                                              entityStatus={tl.entityStatus}
                                              todolistID={tl.id}
                                              tasks={tasks[tl.id]}
                                              removeTask={removeTask}
                                              addTask={addTask}
                                              changeFilter={changeFilter}
                                              switchTaskStatus={switchTaskStatus}
                                              filter={tl.filter}
                                              editTaskTitle={editTaskTitle}
                                              editTodolistTitle={editTodolistTitle}
                                              removeTodolistCallback={removeTodolist}
                                    />
                                </Paper>
                            </Grid>)
                    })
                }
            </Grid>
        </>
    )

})
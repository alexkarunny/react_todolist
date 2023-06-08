import React, {useCallback, useEffect, useState} from 'react';
import {Todolist} from './components/Todolist';
import './App.css'
import {AddItemForm} from './components/AddItemForm';
import {
    AppBar,
    Button,
    Checkbox,
    Container,
    createTheme,
    CssBaseline,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    Paper,
    ThemeProvider,
    Toolbar,
    Typography
} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {amber, lightGreen} from '@mui/material/colors';
import {createTask, deleteTask, ModelDomainType, TasksType, updateTask} from './state/tasks-reducers';
import {
    changeTodolistFilterAC,
    changeTodolistTitle,
    createTodolist,
    deleteTodolist,
    fetchTodolists,
    FilterType,
    TodolistDomainType
} from './state/todolists-reducers';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TaskStatusType} from './api/todolists-api';

export function AppWithRedux(): JSX.Element {

    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const dispatch = useDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchTodolists())
    }, [])

    const [isDarkMode, setDarkMode] = useState<boolean>(true)

    const removeTask = useCallback((taskId: string, todolistID: string) => {
        // @ts-ignore
        dispatch(deleteTask(todolistID, taskId))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistID: string) => {
        // @ts-ignore
        dispatch(createTask(todolistID, title))
    }, [dispatch])

    const changeFilter = useCallback((filter: FilterType, todolistID: string) => {
        dispatch(changeTodolistFilterAC(todolistID, filter))
    }, [dispatch])

    const switchTaskStatus = useCallback((todolistID: string, taskId: string, taskStatus: boolean) => {
        const model: ModelDomainType = {status: taskStatus ? TaskStatusType.Completed : TaskStatusType.New}
        // @ts-ignore
        dispatch(updateTask( todolistID, taskId, model))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        // @ts-ignore
        dispatch(createTodolist(title))
    }, [dispatch])

    const editTaskTitle = useCallback((newTitle: string, todolistId: string, taskId: string) => {
        // @ts-ignore
        dispatch(updateTask(todolistId, taskId, {title: newTitle}))
    }, [dispatch])

    const editTodolistTitle = useCallback((newTitle: string, todolistId: string) => {
        // @ts-ignore
        dispatch(changeTodolistTitle(todolistId, newTitle))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        // @ts-ignore
        return dispatch(deleteTodolist(todolistId));
    }, [dispatch])

    const mode = isDarkMode ? 'dark' : 'light'

    const customTheme = createTheme({

        palette: {
            primary: amber,
            secondary: lightGreen,
            mode: mode
        }
    })

    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline/>
            <div className={'App'}>
                <AppBar position={'static'}>
                    <Toolbar>
                        <IconButton
                            size={'large'}
                            edge={'start'}
                            color={'inherit'}
                            aria-label={'menu'}
                            sx={{mr: 2}}
                        >
                            <Menu/>
                        </IconButton>
                        <Typography
                            variant={'h6'}
                            component={'div'}
                            sx={{flexGrow: 1}}
                        >
                            Todolists
                        </Typography>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox
                                    onChange={(e) => setDarkMode(e.currentTarget.checked)}
                                />}
                                label={isDarkMode ? 'Dark' : 'light'}/>
                        </FormGroup>
                        <Button color={'inherit'}>Login</Button>
                    </Toolbar>

                </AppBar>
                <Container fixed>
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
                </Container>
            </div>
        </ThemeProvider>
    );
}
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
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksType} from './state/tasks-reducers';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterType,
    removeTodolistAC,
    TodolistType
} from './state/todolists-reducers';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {todolistsAPI} from './api/todolists-api';

export function AppWithRedux(): JSX.Element {

    useEffect(() => {
        todolistsAPI.updateTodolistTitle('ce4164e1-b7ea-4b87-8472-3df0a8a7f9a6', 'newTasks')
            .then(res => {
                debugger
                console.log(res.data)
            })
    }, [])

    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    const dispatch = useDispatch()

    const [isDarkMode, setDarkMode] = useState<boolean>(true)

    const removeTask = useCallback((taskId: string, todolistID: string) => {
        dispatch(removeTaskAC(taskId, todolistID))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistID: string) => {
        dispatch(addTaskAC(title, todolistID))
    }, [dispatch])

    const changeFilter = useCallback((filter: FilterType, todolistID: string) => {
        dispatch(changeTodolistFilterAC(todolistID, filter))
    }, [dispatch])

    const changeTaskStatus = useCallback((taskId: string, taskStatus: boolean, todolistID: string) => {
        dispatch(changeTaskStatusAC(taskId, taskStatus, todolistID))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])

    const editTaskTitle = useCallback((newTitle: string, todolistId: string, taskId: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
    }, [dispatch])

    const editTodolistTitle = useCallback((newTitle: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
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
                                                      changeTaskStatus={changeTaskStatus}
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
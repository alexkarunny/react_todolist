import React, {useState} from 'react';
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
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TasksType,
    TaskType
} from './state/tasks-reducers';
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

export function AppWithRedux(): JSX.Element {
    console.log('app')
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    const dispatch = useDispatch()

    const [isDarkMode, setDarkMode] = useState<boolean>(true)

    const removeTask = (taskId: string, todolistID: string) => {

        dispatch(removeTaskAC(taskId, todolistID))
    }

    const addTask = (title: string, todolistID: string) => {

        dispatch(addTaskAC(title, todolistID))
    }

    const changeFilter = (filter: FilterType, todolistID: string) => {

        dispatch(changeTodolistFilterAC(todolistID, filter))
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistID: string) => {

        dispatch(changeTaskStatusAC(taskId, taskStatus, todolistID))
    }

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    const editTaskTitle = (newTitle: string, todolistId: string, taskId: string) => {

        dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
    }

    const editTodolistTitle = (newTitle: string, todolistId: string) => {


        dispatch(changeTodolistTitleAC(todolistId, newTitle))
    }

    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }

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

                                let tasksForTodolist: TaskType[] = []

                                switch (tl.filter) {
                                    case 'all':
                                        tasksForTodolist = tasks[tl.id]
                                        break;
                                    case 'active' :
                                        tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
                                        break
                                    case 'completed':
                                        tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
                                        break
                                }

                                return (
                                    <Grid item key={tl.id}>
                                        <Paper elevation={3}>
                                            <Todolist title={tl.title}

                                                      todolistID={tl.id}
                                                      tasks={tasksForTodolist}
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
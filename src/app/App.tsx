import React, {useEffect, useState} from 'react';
import './App.css'
import {
    AppBar,
    Button,
    Checkbox, CircularProgress,
    Container,
    createTheme,
    CssBaseline,
    FormControlLabel,
    FormGroup,
    IconButton, LinearProgress,
    ThemeProvider,
    Toolbar,
    Typography
} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {amber, lightGreen} from '@mui/material/colors';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {useAppDispatch, useAppSelector} from './hooks';
import {ErrorSnackbar} from '../components/errorSnackbar/ErrorSnackbar';
import {Login} from '../features/Login/Login';
import {Navigate, Route, Routes} from 'react-router-dom';
import {initializeApp} from './app-reducer';
import {logOut} from '../features/Login/auth-reducer';

export function App(): JSX.Element {
    const status = useAppSelector(state => state.app.status)
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(initializeApp())
    }, [])
    const [isDarkMode, setDarkMode] = useState<boolean>(true)
    const mode = isDarkMode ? 'dark' : 'light'
    const customTheme = createTheme({
        palette: {
            primary: amber,
            secondary: lightGreen,
            mode: mode
        }
    })
    const handleLogOut = () => {
        dispatch(logOut())
    }
    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline/>
            <div className={'App'}>
                <ErrorSnackbar/>
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
                                name={'checkbox'}
                                control={<Checkbox
                                    onChange={(e) => setDarkMode(e.currentTarget.checked)}
                                />}
                                label={isDarkMode ? 'Dark' : 'light'}/>
                        </FormGroup>
                        <Button color={'inherit'}>Login</Button>
                        {isLoggedIn && <Button color={'inherit'} onClick={handleLogOut}>Log out</Button>}
                    </Toolbar>

                </AppBar>
                {status === 'loading' && <LinearProgress color="inherit"/>}
                <Container fixed>
                    <Routes>
                        <Route path={'/'} element={<TodolistsList/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>}/>
                        <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                    </Routes>

                </Container>
            </div>
        </ThemeProvider>
    );
}


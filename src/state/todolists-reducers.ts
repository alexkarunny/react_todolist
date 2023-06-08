import {v1} from 'uuid';
import {todolistsAPI, TodolistType} from '../api/todolists-api';
import {Dispatch} from 'redux';

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export const ADD_TODOLIST = 'ADD-TODOLIST'
export const SET_TODOLISTS = 'SET-TODOLISTS'
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'

export type TodolistDomainType = TodolistType & {
    filter: FilterType
}

export type FilterType = 'all' | 'active' | 'completed'

export type ActionTodolistsType = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolists>

export const todolistID1 = v1()
export const todolistID2 = v1()

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionTodolistsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.todolistID)
        case 'ADD-TODOLIST':
            return [
                {
                    ...action.todolist,
                    filter: 'all'
                },
                ...state
            ]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.todolistID
                ? {...t, title: action.title}
                : t)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.id
                ? {...t, filter: action.filter}
                : t)
        case 'SET-TODOLISTS':
            return action.todolists.map(t => ({
                ...t,
                filter: 'all'
            }))
        default:
            return state
    }
}

export const removeTodolistAC = (todolistID: string) => {
    return {
        type: REMOVE_TODOLIST,
        todolistID
    } as const
}

export const addTodolistAC = (todolist: TodolistType) => {
    return {
        type: ADD_TODOLIST,
        todolist
    } as const
}

export const changeTodolistTitleAC = (todolistID: string, title: string) => {
    return {
        type: CHANGE_TODOLIST_TITLE,
        todolistID,
        title
    } as const
}

export const changeTodolistFilterAC = (id: string, filter: FilterType) => {
    return {
        type: CHANGE_TODOLIST_FILTER,
        id,
        filter
    } as const
}

export const setTodolists = (todolists: TodolistType[]) => {
    return {
        type: SET_TODOLISTS,
        todolists
    } as const
}

export const fetchTodolists = () => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolists()
            .then(res => {
                dispatch(setTodolists(res.data))
            })
    }
}

export const createTodolist = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.addTodolist(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}

export const deleteTodolist = (todolistID: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTodolist(todolistID)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTodolistAC(todolistID))
                }
            })
    }
}

export const changeTodolistTitle = (todolistID: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolistTitle(todolistID, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTodolistTitleAC(todolistID, title))
                }
            })
    }
}
import {todolistsAPI, TodolistType} from '../../api/todolists-api';
import {AppThunk} from '../../app/store';

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export const ADD_TODOLIST = 'ADD-TODOLIST'
export const SET_TODOLISTS = 'SET-TODOLISTS'
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'

//reducer
export const todolistsReducer = (state: TodolistDomainType[] = [], action: TodolistsActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.todolistId)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.todolistId ? {...t, title: action.title} : t)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.todolistId ? {...t, filter: action.filter} : t)
        case 'SET-TODOLISTS':
            return action.todolists.map(t => ({...t, filter: 'all'}))
        default:
            return state
    }
}

//actions
export const removeTodolistAC = (todolistId: string) =>
    ({type: REMOVE_TODOLIST, todolistId} as const)
export const addTodolistAC = (todolist: TodolistType) =>
    ({type: ADD_TODOLIST, todolist} as const)
export const changeTodolistTitleAC = (todolistId: string, title: string) =>
    ({type: CHANGE_TODOLIST_TITLE, todolistId, title} as const)
export const changeTodolistFilterAC = (todolistId: string, filter: FilterType) =>
    ({type: CHANGE_TODOLIST_FILTER, todolistId, filter} as const)
export const setTodolists = (todolists: TodolistType[]) => ({type: SET_TODOLISTS, todolists} as const)

//thunks
export const fetchTodolists = (): AppThunk => (dispatch) => {
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolists(res.data))
        })
}
export const createTodolist = (title: string): AppThunk => (dispatch) => {
    todolistsAPI.addTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const deleteTodolist = (todolistID: string): AppThunk => (dispatch) => {
    todolistsAPI.deleteTodolist(todolistID)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC(todolistID))
            }
        })
}
export const changeTodolistTitle = (todolistId: string, title: string): AppThunk => (dispatch) => {
    todolistsAPI.updateTodolistTitle(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(todolistId, title))
            }
        })
}

//types
export type TodolistDomainType = TodolistType & {
    filter: FilterType
}
export type FilterType = 'all' | 'active' | 'completed'
export type TodolistsActionsType = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolists>
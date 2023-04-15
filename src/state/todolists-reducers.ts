import {FilterType, TodolistType} from '../App';
import {v1} from 'uuid';

const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
const ADD_TODOLIST = 'ADD-TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'

export type ActionType = ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof ChangeTodolistFilterAC>

export const todolistsReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.id
                ? {...t, title: action.title}
                : t)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map( t => t.id === action.id
            ? {...t, filter: action.filter}
            : t)
        default:
            return state
    }
}

export const RemoveTodolistAC = (todolistID: string) => {
    return {
        type: REMOVE_TODOLIST,
        id: todolistID
    } as const
}

export const AddTodolistAC = (title: string) => {
    return {
        type: ADD_TODOLIST,
        title
    } as const
}

export const ChangeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: CHANGE_TODOLIST_TITLE,
        id,
        title
    } as const
}

export const ChangeTodolistFilterAC = (id: string, filter: FilterType) => {
    return {
        type: CHANGE_TODOLIST_FILTER,
        id,
        filter
    } as const
}
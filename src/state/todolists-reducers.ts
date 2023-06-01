import {v1} from 'uuid';
import {TodolistType} from '../api/todolists-api';

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export const ADD_TODOLIST = 'ADD-TODOLIST'
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

export const todolistID1 = v1()
export const todolistID2 = v1()

const initialState: TodolistDomainType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistID2, title: 'What to read', filter: 'all', addedDate: '', order: 0},
]

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionTodolistsType): TodolistDomainType[] => {
    switch (action.type) {

        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: action.id, title: action.title, filter: 'all', addedDate: '', order: 0}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.id
                ? {...t, title: action.title}
                : t)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.id
                ? {...t, filter: action.filter}
                : t)
        default:
            return state
    }
}

export const removeTodolistAC = (todolistID: string) => {
    return {
        type: REMOVE_TODOLIST,
        id: todolistID
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: ADD_TODOLIST,
        title,
        id: v1()
    } as const
}

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: CHANGE_TODOLIST_TITLE,
        id,
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
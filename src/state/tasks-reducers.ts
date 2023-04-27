import {TasksType} from '../App';
import {v1} from 'uuid';
import {ADD_TODOLIST, AddTodolistAC, REMOVE_TODOLIST, RemoveTodolistAC} from './todolists-reducers';

export const REMOVE_TASK = 'REMOVE-TASK'
const ADD_TASK = 'ADD_TASK'
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'
const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE'

export type RemoveTaskAT = {
    type: typeof REMOVE_TASK
    taskId: string
    todolistId: string
}

export type AddTaskAT = {
    type: typeof ADD_TASK
    title: string
    todolistId: string
    taskId: string
}

export type ChangeTaskStatusAT = {
    type: typeof CHANGE_TASK_STATUS
    taskId: string
    status: boolean
    todolistId: string
}

export type ChangeTaskTitleAT = {
    type: typeof CHANGE_TASK_TITLE
    taskId: string
    title: string
    todolistId: string
}

export type actionTypes = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | ReturnType<typeof AddTodolistAC> | ReturnType<typeof RemoveTodolistAC>

export const tasksReducer = (state: TasksType, action: actionTypes): TasksType => {

    switch (action.type) {
        case REMOVE_TASK:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case ADD_TASK:
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId], {
                    id: action.taskId,
                    title: action.title,
                    isDone: false
                }]
            }
        case CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId
                    ? {...t, isDone: action.status}
                    : t)
            }
        case CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId
                    ? {...t, title: action.title}
                    : t)
            }
        case ADD_TODOLIST:
            return {
                ...state,
                [action.id] : []
            }
        case REMOVE_TODOLIST:
            const copyState = {...state}
            delete copyState[action.id]
            return copyState

        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskAT => {
    return {
        type: REMOVE_TASK,
        taskId,
        todolistId
    }
}

export const addTaskAC = (title: string, todolistId: string): AddTaskAT => {
    return {
        type: ADD_TASK,
        title,
        todolistId,
        taskId: v1(),
    }
}

export const changeTaskStatusAC = (taskId: string, status: boolean, todolistId: string): ChangeTaskStatusAT => {
    return {
        type: CHANGE_TASK_STATUS,
        taskId,
        status,
        todolistId
    }
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleAT => {
    return {
        type: CHANGE_TASK_TITLE,
        taskId,
        todolistId,
        title
    }
}



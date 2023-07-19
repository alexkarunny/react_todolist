import {
    ADD_TODOLIST,
    addTodolistAC, clearTodosData,
    REMOVE_TODOLIST,
    removeTodolistAC,
    SET_TODOLISTS,
    setTodolists
} from './todolists-reducers';
import {ModelType, TaskType, todolistsAPI} from '../../api/todolists-api';
import {AppRootStateType, AppThunk} from '../../app/store';
import {RequestStatusType, switchRequestStatus} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';

//const
const REMOVE_TASK = 'REMOVE-TASK'
const SET_TASKS = 'SET-TASKS'
const ADD_TASK = 'ADD_TASK'
const CHANGE_TASK = 'CHANGE_TASK'

//reducer
export const tasksReducer = (state: TasksType = {}, action: TasksActionsType): TasksType => {
    switch (action.type) {
        case REMOVE_TASK:
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case ADD_TASK:
            return {
                ...state,
                [action.task.todoListId]: [{...action.task, entityTaskStatus: 'idle'}, ...state[action.task.todoListId]]
            }
        case CHANGE_TASK:
            return {
                ...state,
                [action.task.todoListId]: state[action.task.todoListId]
                    .map(t => t.id === action.task.id
                        ? {...t, ...action.task}
                        : t)
            }
        case ADD_TODOLIST:
            return {...state, [action.todolist.id]: []}
        case REMOVE_TODOLIST:
            debugger
            const copyState = {...state}
            delete copyState[action.todolistId]
            return copyState
        case SET_TODOLISTS:
            debugger
            const tasks: TasksType = {}
            action.todolists.forEach(t => {
                tasks[t.id] = []
            })
            return tasks
        case SET_TASKS:
            return {...state, [action.todolistId]: action.tasks.map(t => ({...t, entityTaskStatus: 'idle'}))}
        case 'CHANGE-ENTITY-TASK-STATUS':
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId
                    ? {...t, entityTaskStatus: action.status}
                    : t)
            }
        case 'CLEAR-TODOS-DATA':
            return {}
        default:
            return state
    }
}

//actions
export const removeTaskAC = (todolistId: string, taskId: string) => ({type: REMOVE_TASK, todolistId, taskId} as const)
export const addTaskAC = (task: TaskType) => ({type: ADD_TASK, task} as const)
export const changeTaskAC = (task: TaskType) => ({type: CHANGE_TASK, task} as const)
export const setTasks = (todolistId: string, tasks: TaskType[]) => ({type: SET_TASKS, todolistId, tasks} as const)
export const changeEntityTaskStatus = (todolistId: string, taskId: string, status: RequestStatusType) => ({
    type: 'CHANGE-ENTITY-TASK-STATUS',
    todolistId,
    taskId,
    status
} as const)

//thunks
export const fetchTasks = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(switchRequestStatus('loading'))
    todolistsAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasks(todolistId, res.data.items))
            dispatch(switchRequestStatus('succeeded'))
        }).catch(error => {
        handleServerNetworkError(error, dispatch)
    })
}
export const deleteTask = (todolistId: string, taskId: string): AppThunk => (dispatch) => {
    dispatch(changeEntityTaskStatus(todolistId, taskId, 'loading'))
    dispatch(switchRequestStatus('loading'))
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(todolistId, taskId))
                dispatch(switchRequestStatus('succeeded'))
                dispatch(changeEntityTaskStatus(todolistId, taskId, 'succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(changeEntityTaskStatus(todolistId, taskId, 'failed'))
            }
        }).catch(error => {
        handleServerNetworkError(error, dispatch)
        dispatch(changeEntityTaskStatus(todolistId, taskId, 'failed'))
    })

}
export const createTask = (todolistId: string, title: string): AppThunk => (dispatch) => {
    dispatch(switchRequestStatus('loading'))
    todolistsAPI.addTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(switchRequestStatus('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch(error => {
        handleServerNetworkError(error, dispatch)
    })
}
export const updateTask = (todolistId: string, taskId: string, modelDomain: ModelDomainType): AppThunk => (dispatch, getState: () => AppRootStateType) => {
    dispatch(changeEntityTaskStatus(todolistId, taskId, 'loading'))
    dispatch(switchRequestStatus('loading'))
    const task = getState().tasks[todolistId].find(t => t.id === taskId)

    if (task) {
        const model: ModelType = {
            title: task.title,
            status: task.status,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            completed: task.completed,
            ...modelDomain
        }
        todolistsAPI.updateTask(todolistId, taskId, model)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTaskAC(res.data.data.item))
                    dispatch(switchRequestStatus('succeeded'))
                    dispatch(changeEntityTaskStatus(todolistId, taskId, 'succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                    dispatch(changeEntityTaskStatus(todolistId, taskId, 'failed'))
                }
            }).catch(error => {
            handleServerNetworkError(error, dispatch)
            dispatch(changeEntityTaskStatus(todolistId, taskId, 'failed'))
        })

    }
}

//types
export type DomainTaskType = TaskType & {
    entityTaskStatus: RequestStatusType
}
export type TasksType = {
    [key: string]: DomainTaskType[]
}
export type ModelDomainType = {
    title?: string
    description?: string
    completed?: boolean
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
export type TasksActionsType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolists>
    | ReturnType<typeof setTasks>
    | ReturnType<typeof changeEntityTaskStatus>
    | ReturnType<typeof clearTodosData>
import {v1} from 'uuid';
import {
    ADD_TODOLIST,
    addTodolistAC,
    REMOVE_TODOLIST,
    removeTodolistAC,
    SET_TODOLISTS,
    setTodolists,
    todolistID1,
    todolistID2
} from './todolists-reducers';
import {ModelType, TaskPriorityType, TaskStatusType, TaskType, todolistsAPI} from '../api/todolists-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from './store';

export const REMOVE_TASK = 'REMOVE-TASK'
export const SET_TASKS = 'SET-TASKS'
const ADD_TASK = 'ADD_TASK'
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'
const CHANGE_TASK = 'CHANGE_TASK'

export type TasksType = {
    [key: string]: TaskType[]
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

export type RemoveTaskAT = {
    type: typeof REMOVE_TASK
    taskId: string
    todolistId: string
}

export type AddTaskAT = {
    type: typeof ADD_TASK
    task: TaskType
}

export type ChangeTaskStatusAT = {
    type: typeof CHANGE_TASK_STATUS
    todolistId: string
    taskId: string
    task: TaskType
}

export type ChangeTaskTitleAT = {
    type: typeof CHANGE_TASK
    task: TaskType
}

export type ActionTasksType =
    RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolists>
    | ReturnType<typeof setTasks>

const initialState: TasksType = {
    [todolistID1]: [
        {
            id: v1(),
            title: 'React',
            status: TaskStatusType.New,
            addedDate: '',
            completed: false,
            deadline: '',
            order: 0,
            startDate: '',
            description: '',
            priority: TaskPriorityType.Low,
            todoListId: todolistID1
        },
        {
            id: v1(),
            title: 'HTML',
            status: TaskStatusType.New,
            addedDate: '',
            completed: false,
            deadline: '',
            order: 0,
            startDate: '',
            description: '',
            priority: TaskPriorityType.Low,
            todoListId: todolistID1
        },
        {
            id: v1(),
            title: 'CSS',
            status: TaskStatusType.Completed,
            addedDate: '',
            completed: true,
            deadline: '',
            order: 0,
            startDate: '',
            description: '',
            priority: TaskPriorityType.Low,
            todoListId: todolistID1
        },
        {
            id: v1(),
            title: 'SCSS',
            status: TaskStatusType.Completed,
            addedDate: '',
            completed: true,
            deadline: '',
            order: 0,
            startDate: '',
            description: '',
            priority: TaskPriorityType.Low,
            todoListId: todolistID1
        },
    ],
    [todolistID2]: [
        {
            id: v1(),
            title: 'Remark',
            status: TaskStatusType.New,
            addedDate: '',
            completed: false,
            deadline: '',
            order: 0,
            startDate: '',
            description: '',
            priority: TaskPriorityType.Low,
            todoListId: todolistID1
        },
        {
            id: v1(),
            title: 'Stendal',
            status: TaskStatusType.Completed,
            addedDate: '',
            completed: true,
            deadline: '',
            order: 0,
            startDate: '',
            description: '',
            priority: TaskPriorityType.Low,
            todoListId: todolistID1
        },
        {
            id: v1(),
            title: 'Bykov',
            status: TaskStatusType.New,
            addedDate: '',
            completed: false,
            deadline: '',
            order: 0,
            startDate: '',
            description: '',
            priority: TaskPriorityType.Low,
            todoListId: todolistID1
        },
        {
            id: v1(),
            title: 'Conan Doyle',
            status: TaskStatusType.Completed,
            addedDate: '',
            completed: true,
            deadline: '',
            order: 0,
            startDate: '',
            description: '',
            priority: TaskPriorityType.Low,
            todoListId: todolistID1
        },
    ],
}

export const tasksReducer = (state: TasksType = initialState, action: ActionTasksType): TasksType => {

    switch (action.type) {
        case REMOVE_TASK:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case ADD_TASK:
            return {
                ...state,
                [action.task.todoListId]: [...state[action.task.todoListId], action.task]
            }
        case CHANGE_TASK:
            return {
                ...state,
                [action.task.todoListId]: state[action.task.todoListId].map(t => t.id === action.task.id
                    ? {...t, ...action.task}
                    : t)
            }
        case ADD_TODOLIST:
            return {
                ...state,
                [action.todolist.id]: []
            }
        case REMOVE_TODOLIST:
            const copyState = {...state}
            delete copyState[action.todolistID]
            return copyState
        case SET_TODOLISTS:
            const tasks: TasksType = {}
            action.todolists.forEach(t => {
                tasks[t.id] = []
            })
            return tasks
        case SET_TASKS:
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskAT => {
    return {
        type: REMOVE_TASK,
        todolistId,
        taskId
    }
}

export const addTaskAC = (task: TaskType): AddTaskAT => {
    return {
        type: ADD_TASK,
        task
    }
}

export const changeTaskAC = (task: TaskType): ChangeTaskTitleAT => {
    return {
        type: CHANGE_TASK,
        task
    }
}

export const setTasks = (todolistId: string, tasks: TaskType[]) => {
    return {
        type: SET_TASKS,
        todolistId,
        tasks
    } as const
}

export const fetchTasks = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then(res => {
                dispatch(setTasks(todolistId, res.data.items))
            })
    }
}

export const deleteTask = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTaskAC(todolistId, taskId))
                }
            })
    }
}

export const createTask = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.addTask(todolistId, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC(res.data.data.item))
                }
            })
    }
}

export const updateTask = (todolistId: string, taskId: string, modelDomain: ModelDomainType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

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
            debugger
            todolistsAPI.updateTask(todolistId, taskId, model)
                .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(changeTaskAC(res.data.data.item))
                    }
                })
        }
    }
}
import axios from 'axios';

const instance = axios.create({
        baseURL: 'https://social-network.samuraijs.com/api/1.1/',
        withCredentials: true,
        headers: {
            'API-KEY': 'ec9c90ee-a6d4-4afa-9d49-5bbedcb44fd5'
        }
    })

//api
export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>(`todo-lists`)
    },
    addTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<TaskResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    addTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: ModelType) {
        return instance.put<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}

export const authAPI = {
    login(loginModel: LoginModelType) {
        return instance.post<ResponseType<{userId: number}>>(`auth/login`, loginModel)
    }
}

//types
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatusType
    priority: TaskPriorityType
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export enum TaskStatusType {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorityType {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type ResponseType<T = {}> = {
    data: T
    resultCode: number
    messages: string[]
}
type TaskResponseType = {
    items: TaskType[]
    totalCount: number
    error: string
}
export type ModelType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}

export type LoginModelType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
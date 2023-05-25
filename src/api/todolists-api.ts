import axios from 'axios';

const instance = axios.create({
        baseURL: 'https://social-network.samuraijs.com/api/1.1/',
        withCredentials: true,
        headers: {
            'API-KEY': '88c27098-d58c-439b-a5fb-d6a202fce25b'
        }
    }
)

export type TodolistResponseType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<T = {}> = {
    data: T
    resultCode: number
    messages: string[]
}

export const todolistsAPI = {
    getTodolists () {
       return instance.get<TodolistResponseType[]>(`todo-lists`)
    },
    addTodolist (title: string) {
        return instance.post<ResponseType<{item: TodolistResponseType}>>(`todo-lists`, {title})
    },
    deleteTodolist (todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle (todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    }
}
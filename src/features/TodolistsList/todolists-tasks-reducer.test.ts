import {tasksReducer, TasksType} from './tasks-reducers';
import {addTodolistAC, TodolistDomainType, todolistsReducer} from './todolists-reducers';
import {TodolistType} from '../../api/todolists-api';
import {v1} from 'uuid';

let todolistId3: string
let newTodolist: TodolistType
beforeEach(() => {

    todolistId3 = v1()

    newTodolist = {
        id: todolistId3, title: "What to new", addedDate: '', order: 0
    }

})

test('ids should be equals', () => {
    const startTasksState: TasksType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const action = addTodolistAC(newTodolist);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);
    expect(idFromTasks).toBe(idFromTodolists)
});

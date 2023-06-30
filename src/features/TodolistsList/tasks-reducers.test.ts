import {
    addTaskAC, changeEntityTaskStatus,
    changeTaskAC,
    DomainTaskType,
    removeTaskAC,
    setTasks,
    tasksReducer,
    TasksType
} from './tasks-reducers';

import {addTodolistAC, removeTodolistAC, setTodolists} from './todolists-reducers';
import {TaskPriorityType, TaskStatusType, TaskType, TodolistType} from '../../api/todolists-api';
import {v1} from 'uuid';

let startState: TasksType
let newTodolist: TodolistType
let todolistId3: string
let newTask: DomainTaskType

beforeEach(() => {
    todolistId3 = v1()
    startState = {
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatusType.New,
                addedDate: '',
                completed: false,
                deadline: '',
                order: 0,
                startDate: '',
                description: '',
                priority: TaskPriorityType.Low,
                todoListId: 'todolistId1',
                entityTaskStatus: 'idle'
            },
            {
                id: '2', title: 'JS', status: TaskStatusType.Completed,
                addedDate: '',
                completed: true,
                deadline: '',
                order: 0,
                startDate: '',
                description: '',
                priority: TaskPriorityType.Low,
                todoListId: 'todolistId1',
                entityTaskStatus: 'idle'
            },
            {
                id: '3', title: 'React', status: TaskStatusType.New,
                addedDate: '',
                completed: false,
                deadline: '',
                order: 0,
                startDate: '',
                description: '',
                priority: TaskPriorityType.Low,
                todoListId: 'todolistId1',
                entityTaskStatus: 'idle'
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatusType.New,
                addedDate: '',
                completed: false,
                deadline: '',
                order: 0,
                startDate: '',
                description: '',
                priority: TaskPriorityType.Low,
                todoListId: 'todolistId2',
                entityTaskStatus: 'idle'
            },
            {
                id: '2', title: 'milk', status: TaskStatusType.Completed,
                addedDate: '',
                completed: true,
                deadline: '',
                order: 0,
                startDate: '',
                description: '',
                priority: TaskPriorityType.Low,
                todoListId: 'todolistId2',
                entityTaskStatus: 'idle'
            },
            {
                id: '3', title: 'tea', status: TaskStatusType.New,
                addedDate: '',
                completed: false,
                deadline: '',
                order: 0,
                startDate: '',
                description: '',
                priority: TaskPriorityType.Low,
                todoListId: 'todolistId2',
                entityTaskStatus: 'idle'
            }
        ]
    };
    newTodolist = {
        id: todolistId3, title: "What to new", addedDate: '', order: 0
    }
    newTask = {id: '3', title: 'NewTask', status: TaskStatusType.New,
        addedDate: '',
        completed: false,
        deadline: '',
        order: 0,
        startDate: '',
        description: '',
        priority: TaskPriorityType.Low,
        todoListId: 'todolistId2',
        entityTaskStatus: 'idle'
    }
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC('todolistId2', '2' );
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [...startState['todolistId1']],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatusType.New,
                addedDate: '',
                completed: false,
                deadline: '',
                order: 0,
                startDate: '',
                description: '',
                priority: TaskPriorityType.Low,
                todoListId: 'todolistId2',
                entityTaskStatus: 'idle'
            },
            {
                id: '3', title: 'tea', status: TaskStatusType.New,
                addedDate: '',
                completed: false,
                deadline: '',
                order: 0,
                startDate: '',
                description: '',
                priority: TaskPriorityType.Low,
                todoListId: 'todolistId2',
                entityTaskStatus: 'idle'
            }
        ]
    });

});
test('correct task should be added to correct array', () => {

    const action = addTaskAC(newTask);

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('NewTask');
    expect(endState['todolistId2'][0].status).toBe(TaskStatusType.New);
})
test('status of specified task should be changed', () => {

let updatedTask = {
    id: '2',
    title: 'milk',
    status: TaskStatusType.New,
    addedDate: '',
    completed: true,
    deadline: '',
    order: 0,
    startDate: '',
    description: '',
    priority: TaskPriorityType.Low,
    todoListId: 'todolistId2'
}
    const action = changeTaskAC(updatedTask);

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatusType.New);
    expect(endState['todolistId1'][1].status).toBe(TaskStatusType.Completed);
});
test('title of specified task should be changed', () => {


    const verificationTask: TaskType = {
        title: 'lactose-free milk',
        status: TaskStatusType.Completed,
        startDate: '',
        priority: TaskPriorityType.Low,
        description: '',
        deadline: '',
        completed: true,
        id: '2',
        todoListId: 'todolistId2',
        order: 0,
        addedDate: ''
    }

    const action = changeTaskAC( verificationTask)

    const endStatus = tasksReducer(startState, action)

    expect(endStatus['todolistId2'][1].title).toBe('lactose-free milk')
    expect(endStatus['todolistId1'][1].title).toBe('JS')

})
test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC(newTodolist);

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k === todolistId3);
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC('todolistId2');

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).not.toBeDefined();
});
test('empty tasks array should be set', () => {

    let todolistId3 = v1()
    let todolistId4 = v1()
    let todolistId5 = v1()
    let startStateNew = [
        {id: todolistId3, title: 'What to start', addedDate: '', order: 0},
        {id: todolistId4, title: 'What to end', addedDate: '', order: 0},
        {id: todolistId5, title: 'What to middle', addedDate: '', order: 0},
    ]

    const action = setTodolists(startStateNew)

    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState)
    expect(keys.length).toBe(3)
    expect(keys[1]).toBe(todolistId4)
})
test('tasks should be set', () => {

    const todoLists3 = v1()
    const newStartState: TasksType = {
       ...startState,
        [todoLists3]: []
    }
    const action = setTasks(todoLists3, [{
        id: '3', title: '123', status: TaskStatusType.New,
        addedDate: '',
        completed: false,
        deadline: '',
        order: 0,
        startDate: '',
        description: '',
        priority: TaskPriorityType.Low,
        todoListId: todoLists3
    }, {
        id: '4', title: '456', status: TaskStatusType.New,
        addedDate: '',
        completed: false,
        deadline: '',
        order: 0,
        startDate: '',
        description: '',
        priority: TaskPriorityType.Low,
        todoListId: todoLists3
    }])

    const endState = tasksReducer(newStartState, action )

    expect(endState[todoLists3].length).toBe(2)
    expect(endState[todoLists3][1].title).toBe('456')

})
test('task status should be changed', () => {
    const action = changeEntityTaskStatus('todolistId2', '2', 'loading')
    const endState = tasksReducer(startState, action)
    expect(endState['todolistId2'][1].entityTaskStatus).toBe('loading')
    expect(endState['todolistId2'][2].entityTaskStatus).toBe('idle')
})
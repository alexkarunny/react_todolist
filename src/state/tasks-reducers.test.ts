import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TasksType
} from './tasks-reducers';

import {addTodolistAC, removeTodolistAC} from './todolists-reducers';
import {TaskPriorityType, TaskStatusType} from '../api/todolists-api';

let startState: TasksType

beforeEach(() => {
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatusType.New,
                addedDate: '',
                completed: false,
                deadline: '',
                order: 0,
                startDate: '',
                description: '',
                priority: TaskPriorityType.Low,
                todoListId: "todolistId1" },
            { id: "2", title: "JS", status: TaskStatusType.Completed,
                addedDate: '',
                completed: true,
                deadline: '',
                order: 0,
                startDate: '',
                description: '',
                priority: TaskPriorityType.Low,
                todoListId: 'todolistId1' },
            { id: "3", title: "React", status: TaskStatusType.New,
                addedDate: '',
                completed: false,
                deadline: '',
                order: 0,
                startDate: '',
                description: '',
                priority: TaskPriorityType.Low,
                todoListId: "todolistId1" }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatusType.New,
                addedDate: '',
                completed: false,
                deadline: '',
                order: 0,
                startDate: '',
                description: '',
                priority: TaskPriorityType.Low,
                todoListId: "todolistId2" },
            { id: "2", title: "milk", status: TaskStatusType.Completed,
                addedDate: '',
                completed: true,
                deadline: '',
                order: 0,
                startDate: '',
                description: '',
                priority: TaskPriorityType.Low,
                todoListId: 'todolistId2' },
            { id: "3", title: "tea", status: TaskStatusType.New,
                addedDate: '',
                completed: false,
                deadline: '',
                order: 0,
                startDate: '',
                description: '',
                priority: TaskPriorityType.Low,
                todoListId: "todolistId2" }
        ]
    };
})

test('correct task should be deleted from correct array', () => {


    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "3", title: "tea", isDone: false }
        ]
    });

});

test('correct task should be added to correct array', () => {

    const action = addTaskAC("juce", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][3].id).toBeDefined();
    expect(endState["todolistId2"][3].title).toBe("juce");
    expect(endState["todolistId2"][3].status).toBe(TaskStatusType.New);
})

test('status of specified task should be changed', () => {


    const action = changeTaskStatusAC("2", false, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatusType.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatusType.Completed);
});

test('title of specified task should be changed', () => {


    const action = changeTaskTitleAC("2", 'lactose-free milk',"todolistId2" )

    const endStatus = tasksReducer(startState, action)

    expect(endStatus["todolistId2"][1].title).toBe('lactose-free milk')
    expect(endStatus["todolistId1"][1].title).toBe("JS")

})

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC("new todolist");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});




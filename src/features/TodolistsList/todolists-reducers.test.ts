import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterType, setTodolists,
    TodolistDomainType,
    todolistsReducer
} from './todolists-reducers'
import {v1} from 'uuid';
import {TodolistType} from '../../api/todolists-api';

let todolistId1: string
let todolistId2: string
let todolistId3: string

let startState: Array<TodolistDomainType>
let newTodolist: TodolistType

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    todolistId3 = v1()

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'}
    ]

    newTodolist = {
        id: todolistId3, title: "What to new", addedDate: '', order: 0
    }

})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, { type: 'REMOVE-TODOLIST', todolistId: todolistId1})

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {

    const action = addTodolistAC(newTodolist)

    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("What to new");
});
test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const action = changeTodolistTitleAC(todolistId2, newTodolistTitle);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct filter of todolist should be changed', () => {

    let newFilter: FilterType = "completed";

    const action = changeTodolistFilterAC(todolistId2, newFilter);
    const endState = todolistsReducer(startState, action);
    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
test('todolists should be set', () => {

   let todolistId3 = v1()
   let todolistId4 = v1()
   let todolistId5 = v1()
   let startStateNew = [
        {id: todolistId3, title: "What to start", addedDate: '', order: 0},
        {id: todolistId4, title: "What to end", addedDate: '', order: 0},
        {id: todolistId5, title: "What to middle", addedDate: '', order: 0},
    ]

    const action = setTodolists(startStateNew)
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe("What to start")
    expect(endState[2].title).toBe("What to middle")
} )
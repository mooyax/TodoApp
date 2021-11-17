import { handleActions } from 'redux-actions'
import { Actions } from '../actions/actionCreators'

//TodoのReducer

//初期ステート
const initialState = {
    todos: [],
    currentIndex: 0,
    currentTheme: 'light',
}

function deleteTodoEx(todo, Todos){
    const todos = Object.assign([], Todos)
    const index = todos.indexOf(todo)
    todos.splice(index,1)
    return todos
}

function toggleTodoEx(todo, Todos){
    const todos = Object.assign([], Todos)
    const index = todos.indexOf(todo)
    todo.done = !todo.done
    todos[index] = todo
    return todos
}

const todoReducer = handleActions({
    [Actions.todoAdd]: (state, action) =>({
        ...state,
        todos: [...state.todos, {title: action.payload, index: state.currentIndex, done: false}],
        currentIndex: state.currentIndex + 1
    }),
    [Actions.todoDelete]: (state, action) =>({
        ...state,
        todos:deleteTodoEx(action.payload, state.todos)      
    }),
    [Actions.todoToggle]: (state, action) =>({
        ...state,
        todos:toggleTodoEx(action.payload, state.todos)
    }),
    [Actions.themeSettings]: (state, action) =>({
        ...state,
        currentTheme:action.payload
    }),
}, initialState)

export default todoReducer
/*
const todoReducer = (state = initialState, action) => {

  

    switch(action.type) {
        case TODO.ADD:
            const newTodo = {title: action.text, index: state.currentIndex, done: false}
            return {
                ...state,
                todos: [...state.todos, newTodo],
                currentIndex: state.currentIndex + 1
            }
            
        case TODO.DELETE:
            const todoItem = action.todo
            const index = todos.indexOf(todoItem)
            todos.splice(index,1)
            return {
                ...state,
                todos:Object.assign([], state.todos)
            }
          
        case TODO.TOGGLE:
            const todoItem = action.todo
            const index = todos.indexOf(todoItem)
            todoItem.done = !todoItem.done
            todos[index] = todoItem
            return {
                ...state,
                todos:Object.assign([], state.todos)
            }
        
        case SETTINGS.THEME:
            return {
                ...state,
                currentTheme:action.theme 
            }
        
        default:
            return state
    }
}

export default todoReducer

*/
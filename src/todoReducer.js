import { TODO } from './actions'

//TodoのReducer

//初期ステート
const initialState = {
    todos: [],
    currentIndex: 0,
}

const todoReducer = (state = initialState, action) => {

    const todoItem = action.todo
    const todos = Object.assign([], state.todos)
    const index = todos.indexOf(todoItem)

    switch(action.type) {
        case TODO.ADD:
            const newTodo = {title: action.text, index: state.currentIndex, done: false}
            return {
                ...state,
                todos: [...state.todos, newTodo],
                currentIndex: state.currentIndex + 1
            }
            
        case TODO.DELETE:
            todos.splice(index,1)
            return {
                ...state,
                todos:todos
            }
          
        case TODO.TOGGLE:
   
   
            todoItem.done = !todoItem.done
            todos[index] = todoItem
            return {
                ...state,
                todos:todos
            }
            
        default:
            return state
    }
}

export default todoReducer
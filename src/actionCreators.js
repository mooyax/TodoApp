import { TODO } from './actions';

//アクション関数
export const addTodo = (text) => {
    return {
        type: TODO.ADD,
        text
    }
}

export const deleteTodo = (todo) => {
    return {
        type: TODO.DELETE,
        todo
    }
}

export const toggleTodo = (todo) => {
    return {
        type: TODO.TOGGLE,
        todo
    }
}
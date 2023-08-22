const { createStore } = require("redux");

function todoReducer(state, action) {
    if (action.type === "ADD_TODO") {
        const todoText = action.payload.todoText;
        return [
            ...state,
            {
                text: todoText,
                isFinished: false,
                id: !state.length ? 1 : state[state.length - 1].id + 1,
            },
        ];
    } else if (action.type === "DELETE_TODO") {
        const todo = action.payload.todo;
        return state.filter((element) => element.id !== todo.id);
    } else if (action.type === "EDIT_TODO") {
        const { todo, todoText } = action.payload;
        return state.map((el) => {
            if (todo.id === el.id) el.text = todoText;
            return el;
        });
    }
    return state;
}

const response = createStore(todoReducer, []);

const {dispatch, subscribe, getState, replaceReducer}= response;

dispatch({type: 'ADD_TODO', payload: {todoText: 'todo number1 is here'}})
dispatch({type: 'ADD_TODO', payload: {todoText: 'todo number2 is here'}})
// dispatch({type: 'DELETE_TODO', payload: {todo: getState()[0]}})
dispatch({type: 'EDIT_TODO', payload: {todo: getState()[0], todoText: 'todo number1 is edited here'}})
console.log(getState())
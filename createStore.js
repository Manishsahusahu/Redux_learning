const { createStore, bindActionCreators, combineReducers } = require("redux");

function todoReducer(state = [], action) {
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
        if (!todo) return state;
        return state.filter((element) => element.id !== todo.id);
    } else if (action.type === "EDIT_TODO") {
        const { todo, todoText } = action.payload;
        if (!todo) return state;
        return state.map((el) => {
            if (todo.id === el.id) el.text = todoText;
            return el;
        });
    }
    return state;
}

function userReducer(state = [], action) {
    if (action.type === " ADD_USER") {
        const user = action.payload.user;
        return [
            ...state,
            {
                user: user,
                id: state.length ? state[state.length - 1].id + 1 : 1,
            },
        ];
    }
    return state;
}

const reducer = combineReducers({ todo: todoReducer, users: userReducer });

const response = createStore(reducer);

const { dispatch, subscribe, getState, replaceReducer } = response;

subscribe(() => {
    console.log(getState());
});

const addTodoActionCreater = (todoText) => ({
    type: "ADD_TODO",
    payload: { todoText: todoText },
});
const deleteTodoActionCreater = (todo) => ({
    type: "DELETE_TODO",
    payload: { todo: todo },
});
const editTodoActionCreater = (todo, todoText) => ({
    type: "EDIT_TODO",
    payload: { todo: todo, todoText: todoText },
});

// dispatch(addTodoActionCreater("todo number1 is here"));
// dispatch(addTodoActionCreater("todo number2 is here"));
// dispatch(deleteTodoActionCreater(getState()[0]));
// dispatch(editTodoActionCreater(getState()[0], "todo number1 is edited here"));

//we can bind/wrap the particular action creator methods with dispatch so that always those methods gets called with binded dispatch only

const actions = bindActionCreators(
    { addTodoActionCreater, deleteTodoActionCreater, editTodoActionCreater },
    dispatch
);

actions.addTodoActionCreater("todo number1 is here");
actions.addTodoActionCreater("todo number2 is here");
actions.deleteTodoActionCreater(getState()[0]);
actions.editTodoActionCreater(getState()[0], "todo number1 is edited here");

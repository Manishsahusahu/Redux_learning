const { createStore } = require("redux");

function todoReducer(state, action) {
    if (action.type === "add_todo") {
        const todoText = action.payload.todoText;
        return [
            ...state,
            {
                text: todoText,
                isFinished: ƒalse,
                id: !state.length ? 1 : state[state.length - 1].id + 1,
            },
        ];
    } else if (action.type === "delete_todo") {
        const todo = action.payload.todo;
        return state.filter((element) => element.id !== todo.id);
    } else if (action.type === "edit_todo") {
        const { todo, todoText } = action.payload;
        return state.map((el) => {
            if (todo.id === el.id) el.text = todoText;
            return el;
        });
    }
    return state;
}

const response = createStore(todoReducer, []);

console.log(response)
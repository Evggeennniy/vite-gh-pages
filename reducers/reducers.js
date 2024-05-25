import { ADD_TASK, TOGGLE_TASK, SET_NEW_TASK } from "../actions/actions";

const initialState = {
  tasks: [
    { id: 1, text: "Завершить проект", isCompleted: false },
    { id: 2, text: "Прочитать книгу", isCompleted: true },
  ],
  newTask: "",
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      const newId =
        state.tasks.length > 0 ? state.tasks[state.tasks.length - 1].id + 1 : 1;
      return {
        ...state,
        tasks: [
          ...state.tasks,
          { id: newId, text: action.payload, isCompleted: false },
        ],
        newTask: "",
      };
    case TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, isCompleted: !task.isCompleted }
            : task
        ),
      };
    case SET_NEW_TASK:
      return {
        ...state,
        newTask: action.payload,
      };
    default:
      return state;
  }
};

export default taskReducer;

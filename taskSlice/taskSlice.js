import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    { id: 1, text: "Завершить проект", isCompleted: false },
    { id: 2, text: "Прочитать книгу", isCompleted: true },
  ],
  newTask: "",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newId =
        state.tasks.length > 0 ? state.tasks[state.tasks.length - 1].id + 1 : 1;
      state.tasks.push({ id: newId, text: action.payload, isCompleted: false });
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.isCompleted = !task.isCompleted;
      }
    },
    setNewTask: (state, action) => {
      state.newTask = action.payload;
    },
  },
});

export const { addTask, toggleTask, setNewTask } = taskSlice.actions;
export default taskSlice.reducer;

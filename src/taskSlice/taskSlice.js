import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  newTask: "",
};

const API_URL = "https://66598be4de346625136ce10e.mockapi.io/api/tasks/tasks";

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (_, { rejectWithValues, dispatch }) => {
    const result = await fetch(API_URL);
    const data = await result.json();
    console.log(data);
    dispatch(setTasks(data));
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskText, { rejectWithValue, dispatch }) => {
    const newTask = {
      text: taskText,
      isCompleted: false,
    };
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      const data = await response.json();
      dispatch(addTask(data));
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const toggleTaskStatus = createAsyncThunk(
  "tasks/toggleTask",
  async (taskId, { rejectWithValue, dispatch, getState }) => {
    const task = getState().tasks.tasks.find((t) => t.id === taskId);
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isCompleted: !task.isCompleted }),
    });
    const data = await response.json();
    dispatch(toggleTask(taskId));
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { rejectWithValue, dispatch }) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    dispatch(removeTask(id));
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, { payload }) => {
      state.tasks = payload;
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
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

export const { addTask, toggleTask, setNewTask, setTasks, removeTask } =
  taskSlice.actions;
export default taskSlice.reducer;

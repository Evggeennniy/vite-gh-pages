export const ADD_TASK = "ADD_TASK";
export const TOGGLE_TASK = "TOGGLE_TASK";
export const SET_NEW_TASK = "SET_NEW_TASK";

export const addTask = (text) => ({
  type: ADD_TASK,
  payload: text,
});

export const toggleTask = (id) => ({
  type: TOGGLE_TASK,
  payload: id,
});

export const setNewTask = (text) => ({
  type: SET_NEW_TASK,
  payload: text,
});

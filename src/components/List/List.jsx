import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setNewTask,
  getTasks,
  createTask,
  toggleTaskStatus,
  deleteTask,
} from "../../taskSlice/taskSlice";

export const ToDoListRedux = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const newTask = useSelector((state) => state.tasks.newTask);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const handleToggle = (id) => {
    console.log("Toggling task:", id);
    dispatch(toggleTaskStatus(id));
  };

  const handleAddTask = () => {
    if (newTask !== "") {
      console.log("Adding task:", newTask);
      dispatch(createTask(newTask));
      dispatch(setNewTask(""));
    }
  };

  const handleDelete = (id) => {
    console.log("Deleting task:", id);
    dispatch(deleteTask(id));
  };

  const handleInputChange = (event) => {
    console.log("Input change:", event.target.value);
    dispatch(setNewTask(event.target.value));
  };

  const sortedTasks = [...tasks].sort((a, b) => b.isCompleted - a.isCompleted);

  return (
    <div>
      <ul>
        {sortedTasks.map((task) => (
          <div>
            <li
              key={task.id}
              style={{
                textDecoration: task.isCompleted ? "line-through" : "none",
              }}
              onClick={() => handleToggle(task.id)}
            >
              {task.text}
            </li>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </div>
        ))}
      </ul>
      <input
        type="text"
        value={newTask}
        onChange={handleInputChange}
        placeholder="Добавьте новую задачу"
      />
      <button onClick={handleAddTask}>Добавить задачу</button>
    </div>
  );
};

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, toggleTask, setNewTask } from "../../../taskSlice/taskSlice";

export const ToDoListRedux = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const newTask = useSelector((state) => state.tasks.newTask);
  const dispatch = useDispatch();

  console.log("tasks:", tasks);
  console.log("newTask:", newTask);

  const handleToggle = (id) => {
    console.log("Toggling task:", id);
    dispatch(toggleTask(id));
  };

  const handleAddTask = () => {
    if (newTask !== "") {
      console.log("Adding task:", newTask);
      dispatch(addTask(newTask));
      dispatch(setNewTask(""));
    }
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
          <li
            key={task.id}
            style={{
              textDecoration: task.isCompleted ? "line-through" : "none",
            }}
            onClick={() => handleToggle(task.id)}
          >
            {task.text}
          </li>
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

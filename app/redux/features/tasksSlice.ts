"use client";
import { createSlice } from "@reduxjs/toolkit";

interface Task{
    id: number,
    title: string,
    details: string,
    status: string
}

interface TasksState {
    tasks: Task[];
}


    const initialState: TasksState = {
        tasks: []
    }

const tasksSlice = createSlice({
    name: "toDo",
    initialState,
    reducers: {
        setTasks: (state, {payload})=>{
            state.tasks = payload
        },
        addTask: (state, {payload})=>{
            state.tasks.push(payload);
            localStorage.setItem("todo", JSON.stringify(state.tasks))
        },
        removeTask: (state, {payload}) => {
            state.tasks = state.tasks.filter((data: Task) => data.id !== payload);
            localStorage.setItem("todo", JSON.stringify(state.tasks))
        },
        updateTask: (state, {payload}) =>{
            let updateIndex = state.tasks.findIndex((data: Task) => data.id == payload.id);
            state.tasks[updateIndex] = payload;
            localStorage.setItem("todo", JSON.stringify(state.tasks))
        },
        updateStatus: (state, {payload})=>{
              let updateIndex = state.tasks.findIndex((data: Task) => data.id == payload);
              state.tasks[updateIndex].status = "Completed"
              localStorage.setItem("todo", JSON.stringify(state.tasks))
        }
    }
})

export const {setTasks,addTask, removeTask, updateTask, updateStatus} = tasksSlice.actions;

export default tasksSlice.reducer
"use client";
import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./features/tasksSlice";


const store = configureStore({
    reducer: {
        toDo: tasksSlice
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store;
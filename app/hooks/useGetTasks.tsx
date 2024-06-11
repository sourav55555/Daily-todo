"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTasks } from "../redux/features/tasksSlice";

const tasksFromLocalStorage = () => {

        const getTasks = localStorage.getItem('todo');
        return getTasks ? JSON.parse(getTasks) : [];

};

const useGetTasks = () => {

    const [loading, setLoading] = useState<boolean>(true)

    const dispatch = useDispatch();
    useEffect(()=>{
        const tasks = tasksFromLocalStorage();
        dispatch(setTasks(tasks));
        setLoading(false);
    },[dispatch])

    return [loading]
};

export default useGetTasks;
"use client";
import { removeTask } from '@/app/redux/features/tasksSlice';
import { RootState } from '@/app/redux/store';
import { Check, Trash } from 'lucide-react';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'

interface Task {
    id: number,
    title: string,
    details: string,
    status: string
}

const CompletedTasks = () => {

    const dispatch = useDispatch();
    const completTasks = useSelector((state: RootState) => state.toDo.tasks).filter((data: Task) => data.status == "Completed");


    const deleteTask = (id: number) => {
        Swal.fire({
            title: "Confirm Delete?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete"
        }).then((result: any) => {
            if (result.isConfirmed) {
                dispatch(removeTask(id))
                toast.success("Task Deleted!")
            }
        });

    }

    return (
        <div>
            <p className='pt-14 text-center text-2xl font-semibold'>Completed Tasks</p>
            <div className='w-[80%] mx-auto mt-8 space-y-5'>
                {
                    completTasks.map((data: Task) => <div className='flex items-center gap-2 justify-between text-sm'>
                        <Check className='w-4 text-green-600' />
                        <p className='flex-1'>{data.title}</p>
                        <Trash onClick={() => deleteTask(data.id)} className='w-4 text-red-500 cursor-pointer'/>
                    </div> )
                }
            </div>
            <Toaster/>
        </div>
    );
};

export default CompletedTasks;


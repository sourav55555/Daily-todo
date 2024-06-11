"use client";
import { removeTask, updateStatus } from "@/app/redux/features/tasksSlice";
import { RootState } from "@/app/redux/store";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2'
import toast, { Toaster } from "react-hot-toast";
import EditTask from "../EditTask/EditTask";
import useGetTasks from "@/app/hooks/useGetTasks";

interface Task {
    id: number,
    title: string,
    details: string,
    status: string
}

const AllTasks = () => {
    const [loading] = useGetTasks();

    const allTasks = useSelector((state: RootState) => state.toDo.tasks);
    const dispatch = useDispatch();

    const [tasksPerPage, setTasksPerPage] = useState<number>(3);
    const [startIndex, setStartIndex] = useState<number>(0);
    const [endIndex, setEndIndex] = useState<number>(tasksPerPage);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pages, setPages] = useState<number[]>([])


    useEffect(() => {
        const totalPages = Math.ceil(allTasks.length / tasksPerPage);
        const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
        setPages(pageNumbers);
        setStartIndex(currentPage * tasksPerPage - tasksPerPage);
        setEndIndex(currentPage * tasksPerPage);

    }, [currentPage, allTasks])


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


    const handleStatus = (id: number) => {

        Swal.fire({
            title: "Completed the task?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Complete"
        }).then((result: any) => {
            if (result.isConfirmed) {
                dispatch(updateStatus(id))
                toast.success("Status Updated!")
            }
        });

    }


    return (
        <div>
            <div className="flex items-center justify-center gap-1 mt-20 py-6">
                <Image
                    src="/checklist.gif"
                    alt="task list"
                    className="h-16 w-16"
                    width={100}
                    height={60}
                    unoptimized
                />
                <p className="text-3xl font-semibold border-b border-teal-400">All Tasks</p>
            </div>

            {/* all tasks list  */}
            {loading ?
                <p className="text-2xl font-semibold text-slate-700 text-center">Loading . . .</p>
                :
                 allTasks.length === 0 && <p className="text-center">No tasks added.</p> 
            }


            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-10 md:px-4 mt-4">

                {
                    allTasks.slice(startIndex, endIndex).map((data: Task) =>
                        <div
                            key={data.id}
                            className="p-5 bg-[rgba(0,0,0,.15)] flex flex-col gap-4 justify-between rounded-xl shadow-md hover:bg-teal-50 hover:shadow-lg transition-all duration-500 ease-out"
                        >
                            <div>
                                <h3 className="text-xl font-semibold mb-3 text-teal-700">{data.title}</h3>
                                <p>{data.details}</p>

                            </div>
                            <div className="mt-2 flex text-sm justify-between">
                                <p className="font-semibold">{data.status}</p>
                                {
                                    data.status == "Pending" && <button
                                        className="underline text-teal-700"
                                        onClick={() => handleStatus(data.id)}
                                    >
                                        Set Complete
                                    </button>
                                }
                            </div>
                            <div className="flex items-center justify-center gap-4">

                                <EditTask task={data} />

                                <button
                                    className="py-2 bg-red-500 text-sm text-white w-24 rounded-lg shadow hover:shadow-md shadow-gray-700 transition-all duration-300"
                                    onClick={() => deleteTask(data.id)}
                                >
                                    Delete
                                </button>

                            </div>
                        </div>
                    )
                }
            </div>


            {/* pagination  */}
            <div className="flex items-center justify-center gap-3 pt-12 pb-4">
                <button
                    className="px-2 py-1 rounded-lg bg-slate-100 me-2 disabled:opacity-30"
                    disabled={currentPage == 1 ? true : false}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    <ChevronLeft />
                </button>
                {
                    pages.map(data =>
                        <button
                            key={data}
                            onClick={() => setCurrentPage(data)}
                            className={`w-8 py-1 rounded-md ${data == currentPage ? "bg-teal-200" : "bg-gray-50"}`}
                        >
                            {data}
                        </button>
                    )
                }
                <button
                    className="px-2 py-1 rounded-lg bg-slate-100 ms-2 disabled:opacity-30"
                    disabled={currentPage == pages.length ? true : false}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    <ChevronRight />
                </button>
            </div>

            <Toaster />
        </div>
    );
};

export default AllTasks;
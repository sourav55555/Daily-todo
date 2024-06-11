"use client";
import useGetTasks from '@/app/hooks/useGetTasks';
import { addTask, setTasks } from '@/app/redux/features/tasksSlice';
import { RootState } from '@/app/redux/store';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea';
import { FilePlus2 } from 'lucide-react';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';


const AddTask = () => {
    useGetTasks();

    const [title, setTitle] = useState<string>("");
    const [details, setDetails] = useState<string>("");
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const dispatch = useDispatch();
    const allTasks = useSelector((state: RootState) => state.toDo.tasks);

    const handleAdd = () => {

        if(title.trim() == ""){
            return toast.error("Task title can't be empty.")
        }
        if (details.trim() == ""){
            return toast.error("Task details can't be empty.")
        }
        const lastTask = allTasks.length > 0 ? allTasks.at(-1) : undefined;
        const taskData = {
            id: lastTask ? lastTask.id + 1 : 1,
            title,
            details,
            status: "Pending"
        }
        dispatch(addTask(taskData))
        toast.success('Task Added!');
        setIsDialogOpen(false);
    };

    return (
        <div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <button
                        className="mt-6 px-10 py-4 bg-teal-100 rounded-xl flex font-semibold justify-center items-center gap-2 shadow-lg hover:bg-teal-700 hover:text-white hover:shadow-md transition-all duration-500 ease-out"
                        onClick={()=> setIsDialogOpen(true)}
                    >
                        Add New Task
                        <FilePlus2 />
                    </button>
                </DialogTrigger>
                
                <DialogContent className="sm:max-w-[450px]">
                    <DialogHeader>
                        <DialogTitle>Add A New Task</DialogTitle>

                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Task Title
                            </Label>
                            <Input
                                id="name"
                                className="col-span-3"
                                type='text'
                                placeholder='Enter task title'
                                name='title'
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-baseline gap-4">
                            <Label htmlFor="details" className="text-right">
                                Task Details
                            </Label>
                            <Textarea
                                id="details"
                                className="col-span-3"
                                placeholder='Task Description'
                                name='details'
                                onChange={(e) => setDetails(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>

                            <button
                                className='px-4 py-2 text-sm bg-green-300 rounded-lg shadow-md'
                                onClick={handleAdd}
                                type="submit"
                            >
                                Add Task
                            </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Toaster/>
        </div>
    );
};

export default AddTask;
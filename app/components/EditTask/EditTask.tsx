"use client";
import { updateTask } from '@/app/redux/features/tasksSlice';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea';
import { FilePlus2 } from 'lucide-react';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';


interface Task{
    id: number,
    title: string,
    details: string,
    status: string
}

const EditTask = ({task} : {task: Task}) => {

    const [title, setTitle] = useState<string>(task?.title);
    const [details, setDetails] = useState<string>(task?.details);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const dispatch = useDispatch();

    const handleAdd = () => {

        if (title.trim() == "") {
            return toast.error("Task title can't be empty.")
        }
        if (details.trim() == "") {
            return toast.error("Task details can't be empty.")
        }
        const taskData = {
            id: task.id,
            title,
            details,
            status: task.status
        }
        dispatch(updateTask(taskData))
        toast.success('Task Updated!');
        setIsDialogOpen(false);
    };

    return (
        <div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <button
                        className="py-2 bg-teal-600 text-sm text-white w-24 rounded-lg shadow hover:shadow-md shadow-gray-700 transition-all duration-300"
                        onClick={() => setIsDialogOpen(true)}
                    >
                        Edit
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
                                type="text"
                                placeholder="Enter task title"
                                defaultValue={title}
                                name="title"
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
                                placeholder="Task Description"
                                name="details"
                                defaultValue={details}
                                onChange={(e) => setDetails(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <button
                            className="px-4 py-2 text-sm bg-green-300 rounded-lg shadow-md"
                            onClick={handleAdd}
                            type="submit"
                        >
                            Update Task
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Toaster />
        </div>
    );
};

export default EditTask;
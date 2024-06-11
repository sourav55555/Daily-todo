import { FilePlus2 } from "lucide-react";
import Image from "next/image";
import AddTask from "./components/AddTask/AddTask";
import AllTasks from "./components/AllTasks/AllTasks";
import CompletedTasks from "./components/CompletedTasks/CompletedTasks";

export default function Home() {

  return (
    <main className="bg-slate-200">
      <div className="max-w-[1300px] bg-white mx-auto">

        <div className="bg-teal-200 py-8 flex items-center justify-center gap-4">
          <Image src="/to-do-list.png" alt="todo" width={50} height={80} />
          <p className="text-2xl font-semibold">Your Daily To-Do</p>
        </div>

        <div className="flex justify-center md:flex-row flex-col">
          <div className="border-r w-full md:w-[75%]">
            <div className="px-8 pt-16">
              <h2 className="text-4xl font-semibold">Create or maintain your daily to-do with this simple website.</h2>

              <AddTask />
            </div>

            <div>
              <AllTasks />
            </div>
          </div>
          <div className="md:w-[25%] w-full">
            <CompletedTasks />
          </div>
        </div>
        <footer className="h-44 w-full px-8 flex items-center flex-col justify-center bg-teal-600 gap-2 text-white mt-20">
          <Image src="/add.png" alt="add" width={50} height={50} />
          <p className="text-lg font-semibold">Complete your daily tasks and get success</p>
        </footer>
      </div>
    </main>
  );
}



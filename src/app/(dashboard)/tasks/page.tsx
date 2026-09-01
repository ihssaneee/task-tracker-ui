// src/app/(dash{board)/tasks/page.tsx
"use client";
import {createTask, getTasks, deleteTask, getTaskById, updateTask} from "@/lib/api/taskApi";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table"

import {Task} from "@/types/task";
import {Loader2,AlertCircle} from "lucide-react";
import CreateTaskModal from "@/components/tasks/CreateTaskModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
export default function TasksPage() {

    const {data:tasks, isLoading, isError} = useQuery({
        queryKey: ["tasks"],
        queryFn: getTasks
    })


    const [openModal, setOpenModal] = useState(false);
   


    if (isLoading){
        return <div className="w-full h-full flex items-center justify-center">Chargement des tâches <Loader2 className="animate-spin" /></div>
    }

    if (isError){
        return <div>Une erreur est survenue <AlertCircle className="h-5 w-5" /></div>
    }

   

 return (
    <div className="p-4 space-y-4">
     <div className="flex justify-between items-center">
       <h1 className="text-2xl font-bold">Tasks</h1>

      <Button variant="default" className="bg-blue-900 flex items-center gap-1.5 p-2 cursor-pointer hover:bg-blue-800" onClick={() => setOpenModal(true)} >
        <Plus className=" h-4 w-4" />
        Create Task
      </Button>
     </div>


        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={tasks || []} />

        <CreateTaskModal isOpen={openModal} onClose={() => setOpenModal(false)} title="Create Task" />
      </div>
    </div>
  );
}
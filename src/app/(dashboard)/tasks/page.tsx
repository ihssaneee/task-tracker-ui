// src/app/(dash{board)/tasks/page.tsx
"use client";
import {createTask, getTasks, deleteTask, getTaskById, updateTask} from "@/lib/api/taskApi";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {Task} from "@/types/task";
import {Loader2,AlertCircle} from "lucide-react";
export default function TasksPage() {

    const {data:tasks, isLoading, isError} = useQuery({
        queryKey: ["tasks"],
        queryFn: getTasks
    })


    if (isLoading){
        return <div className="w-full h-full flex items-center justify-center">Chargement des tâches <Loader2 className="animate-spin" /></div>
    }

    if (isError){
        return <div>Une erreur est survenue <AlertCircle className="h-5 w-5" /></div>
    }

   

 return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Tasks</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Title</th>
              <th className="border border-gray-300 p-2 text-left">Description</th>
              <th className="border border-gray-300 p-2 text-left">Priority</th>
              <th className="border border-gray-300 p-2 text-left">Project</th>
              <th className="border border-gray-300 p-2 text-left">Status</th>
              <th className="border border-gray-300 p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks && tasks.length > 0 ? (
              tasks.map((task: Task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2 font-medium">{task.title}</td>
                  <td className="border border-gray-300 p-2">{task.description || "-"}</td>
                  <td className="border border-gray-300 p-2">{task.priority}</td>
                  <td className="border border-gray-300 p-2">{task.projectName || "-"}</td>
                  <td className="border border-gray-300 p-2">{task.status}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    {/* Actions will go here */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="border border-gray-300 p-4 text-center text-gray-500">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
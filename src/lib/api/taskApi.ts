import {type Task, type CreateTaskDto, type UpdateTaskDto} from "@/types/task";
import {fetchClient} from "./client";


export async function getTasks(){
    return await fetchClient<Task[]>("/tasks");
};

export async function createTask(task: CreateTaskDto){
    return await fetchClient<Task>("/tasks",{
        method: "POST",
        body: JSON.stringify(task),
    })
}

export async function updateTask(taskId: number, task: UpdateTaskDto){
    return await fetchClient<Task>(`/tasks/${taskId}`,{
        method: "PUT",
        body: JSON.stringify(task),

    })
}

    export async function getTaskById(taskId: number){
        return await fetchClient<Task>(`/tasks/${taskId}`,{
            method: "GET",
            
            
        })
    };

    export async function deleteTask(taskId: number){
        return await fetchClient(`/tasks/${taskId}`,{
            method: "DELETE",

        })
    }




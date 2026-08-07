export interface Task{
    id: string,
    title: string,
    description: string,
    isCompleted: boolean,
    createdAt: Date,
    updatedAt: Date,
    status: "not-started" | "in-progress" | "completed",
    priority: "low" | "medium" | "high",
    projectId: string,

    
}

export interface CreateTaskDto{
    title: string,
    description: string,
    isCompleted: boolean,
    status: "not-started" | "in-progress" | "completed",
    priority: "low" | "medium" | "high",
    projectId: string
}

export interface UpdateTaskDto{
    title?: string,
    description?: string,
    isCompleted?: boolean,
    status?: "not-started" | "in-progress" | "completed",
    priority?: "low" | "medium" | "high",
    projectId?: string
}



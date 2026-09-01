export interface Task{
    id?: string,
    title: string,
    description: string,
    isCompleted: boolean,
    createdAt?: Date,
    updatedAt?: Date,
    status: "not-started" | "in-progress" | "completed",
    priority: "low" | "medium" | "high",
    projectId: string,
    dueDate: Date

    
}

export interface CreateTaskDto{
    title: string,
    description: string,
    isCompleted: boolean,
    status: "NotStarted" | "InProgress" | "Completed",
    priority: "Low" | "Medium" | "High",
    projectId?: string
    dueDate: Date | undefined
}

export interface UpdateTaskDto{
    title?: string,
    description?: string,
    isCompleted?: boolean,
    status?: "not-started" | "in-progress" | "completed",
    priority?: "low" | "medium" | "high",
    projectId?: string
}



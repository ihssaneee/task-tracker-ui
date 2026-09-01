import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
 
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { createTask } from "@/lib/api/taskApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { CreateTaskDto, Task } from "@/types/task";
import { toast } from "react-toastify";

export interface modalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}
export default function CreateTaskModal({
  isOpen,
  onClose,
  title,
}: modalProps) {
  const [formData, setFormData] = useState<CreateTaskDto>({
    title: "",
    description: "",
    isCompleted: false,
    status: "NotStarted",
    priority: "Low",
    
    dueDate: undefined,
  });
  const [errors,setErrors]= useState <Record<string, string[]>>({});

  const queryClient = useQueryClient();
  const {
    mutate: handleCreateTask,
    isPending,
    error,
  } = useMutation<Task, Error, CreateTaskDto>({
    mutationFn: createTask,
    onSuccess: () => {
      toast.success("Task was created successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onClose();
      setFormData({
        title: "",
        description: "",
        isCompleted: false,
        status: "NotStarted",
        priority: "Low",
        dueDate: undefined,
      });
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred while creating the task");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleValidation= ():boolean=>{
   const validationErrors: Record<string, string[]> = {};

   if (!formData.title.trim()) {
     validationErrors.title = ["Title is required"];
   }

   if (!formData.description) {
     validationErrors.description = ["Description is required"];
   }

   if (!formData.dueDate) {
     validationErrors.dueDate = ["Due date is required"];
   }

   setErrors(validationErrors);
   return Object.keys(validationErrors).length === 0;
  }

  const handeSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    if (!handleValidation()) return;
    handleCreateTask(formData);
  };

  const statuses = ["NotStarted", "InProgress", "completed"];
  const priorities = ["Low", "Medium", "High"];
  return (
    <div className="">
      <Dialog open={isOpen} onOpenChange={()=>{onClose();setErrors({})}}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <form className="" onSubmit={handeSubmit}>
            <div className="flex flex-col space-y-2 mb-4">
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title[0]}</p>
              )}
            </div>
            <div className="flex flex-col space-y-2 mb-4">
              <Label htmlFor="description">Description</Label>
              <Textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description[0]}</p>
              )}
            </div>
            <div className="flex flex-col space-y-2 mb-4">
              <Label htmlFor="dueDate">Due Date</Label>
              <div className="">
                <Popover>
                  <PopoverTrigger
                    render={<Button variant="outline" className="" />}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dueDate
                      ? format(formData.dueDate, "PPP")
                      : "Pick a date"}
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.dueDate}
                      onSelect={(date) =>
                        setFormData({
                          ...formData,
                          dueDate: date || new Date(),
                        })
                      }
                    />
                  </PopoverContent>
                </Popover>
                {errors.dueDate && (
                  <p className="text-red-500 text-sm">{errors.dueDate[0]}</p>
                )}
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <Label htmlFor="status">Status</Label>
                <Combobox items={statuses}>
                  <ComboboxInput placeholder="Select a status" />
                  <ComboboxContent>
                    <ComboboxEmpty> No status found.</ComboboxEmpty>

                    <ComboboxList>
                      {(status) => (
                        <ComboboxItem
                          key={status}
                          value={status}
                          onSelect={() => setFormData({ ...formData, status })}
                        >
                          {status}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <Label htmlFor="priority">Priority</Label>
                <Combobox items={priorities}>
                  <ComboboxInput placeholder="Select a priority" />
                    <ComboboxContent>
                      <ComboboxEmpty> No priority found.</ComboboxEmpty>
                        <ComboboxList>
                            {(priority) => (
                                <ComboboxItem
                                    key={priority}
                                    value={priority}
                                    onSelect={() => setFormData({ ...formData, priority })}
                                >
                                    {priority}
                                </ComboboxItem>
                            )}
                        </ComboboxList>
                    </ComboboxContent>

                </Combobox>
              </div>
            <div className="flex justify-center gap-8 ">
              <Button type="button" variant="outline" onClick={()=>{onClose();setErrors({})}} className="cursor-pointer p-3">
                Cancel
              </Button>
              <Button type="submit" disabled={isPending} className="cursor-pointer p-3">
                {isPending ? "Creating..." : "Create Task"}
              </Button>
            </div>

            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

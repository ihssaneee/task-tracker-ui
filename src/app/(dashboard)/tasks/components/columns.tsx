"use client"

import { createColumnHelper } from "@tanstack/react-table"
import { type DataTableFeatures } from "./data-table-features"
import { Task } from "@/types/task" // Using your Task type instead of Payment

// Pass "any" first so you don't need the features file!
const columnHelper = createColumnHelper<DataTableFeatures, Task>()

export const columns = columnHelper.columns([
  columnHelper.accessor("title", {
    header: "Title",
  }),
  columnHelper.accessor("status", {
    header: "Status",
  }),
  columnHelper.accessor("priority", {
    header: "Priority",
  }),
  columnHelper.accessor("dueDate", {
    header: "Due Date",
  }),
  columnHelper.accessor("isCompleted", {
    header: "Completed",
  }),
  columnHelper.accessor("description", {
    header: "Description",
  }),

])

// export const columns: ColumnDef<Task>[] = [
//   {
//     accessorKey: "title",
//     header: "Title",
//     cell: ({ row }) => (
//       <span className="font-medium">{row.getValue("title")}</span>
//     ),
//   },

//   {
//     accessorKey: "dueDate",
//     header: "Due Date",
//     cell: ({ row }) => {
//       const dueDate = row.getValue<Date | null>("dueDate");
//       return (
//         <span className="text-muted-foreground">
//           {dueDate ? dueDate.toDateString() : "-"}
//         </span>
//       );
//     },
//   },
//   {
//     accessorKey: "createdAt",
//     header: "Created At",
//     cell: ({ row }) => {
//       const createdAt = row.getValue<Date | null>("createdAt");
//       return (
//         <span className="text-muted-foreground">
//           {createdAt ? createdAt.toDateString() : "-"}
//         </span>
//       );
//     },
//   },
//   {
//     accessorKey: "isCompleted",
//     header: "Completed",
//     cell: ({ row }) => {
//       const isCompleted = row.getValue<boolean>("isCompleted");
//       return (
//         <span className="text-muted-foreground">
//           {isCompleted ? "Yes" : "No"}
//         </span>
//       );
//     },
//   },
//   {
//     accessorKey: "description",
//     header: "Description",
//     cell: ({ row }) => {
//       const description = row.getValue<string | null>("description");
//       return (
//         <span className="max-w-xs truncate text-muted-foreground block">
//           {description || "-"}
//         </span>
//       );
//     },
//   },
//   {
//     accessorKey: "priority",
//     header: "Priority",
//     cell: ({ row }) => {
//       const priority = row.getValue<string>("priority");
//       return (
//         <Badge variant="outline" className="capitalize">
//           {priority}
//         </Badge>
//       );
//     },
//   },
//   // {
//   //   accessorKey: "projectName",
//   //   header: "Project",
//   //   cell: ({ row }) => row.getValue<string | null>("projectName") || "-",
//   // },
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => {
//       const status = row.getValue<string>("status");
//       return <Badge className="capitalize">{status}</Badge>;
//     },
//   },
// ];
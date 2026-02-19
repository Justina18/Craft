"use client";

import KanbanBoard, { KanbanColumn } from "./kanban-board";

const KanbanPage = () => {
  const columns: KanbanColumn[] = [
    {
      id: "backlog",
      title: "Backlog",
      tasks: [
        { id: "1", title: "Create project documentation", labels: ["docs"] },
        { id: "2", title: "Design system components", labels: ["design"], assignee: "JD" },
        { id: "3", title: "Set up testing framework", labels: ["devops"] },
      ],
    },
    {
      id: "todo",
      title: "To Do",
      tasks: [
        { id: "4", title: "Build authentication flow", labels: ["frontend", "backend"], assignee: "SM" },
        { id: "5", title: "API integration", labels: ["backend"], description: "Connect to external APIs" },
      ],
    },
    {
      id: "in-progress",
      title: "In Progress",
      tasks: [
        { id: "6", title: "User dashboard", labels: ["frontend", "urgent"], assignee: "AK" },
        { id: "7", title: "Database optimization", labels: ["backend"] },
      ],
    },
    {
      id: "review",
      title: "Review",
      tasks: [{ id: "8", title: "Code review - Login page", labels: ["frontend"], assignee: "MJ" }],
    },
    {
      id: "done",
      title: "Done",
      tasks: [
        { id: "9", title: "Project setup", labels: ["devops"] },
        { id: "10", title: "Database design", labels: ["backend"] },
      ],
    },
  ];

  const handleTaskMove = (taskId: string, fromColumnId: string, toColumnId: string) => {
    console.log(`Task ${taskId} moved from ${fromColumnId} to ${toColumnId}`);
  };

  const handleTaskAdd = (columnId: string, title: string) => {
    console.log(`New task "${title}" added to ${columnId}`);
  };

  return (
    <div className="min-h-screen w-full bg-[#fff] p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-4xl font-bold text-black">Project Task Board</h1>
          <p className="text-gray-400">Drag and drop tasks between columns to update their status</p>
        </div>
        <KanbanBoard
          columns={columns}
          onTaskMove={handleTaskMove}
          onTaskAdd={handleTaskAdd}
          columnColors={{
            backlog: "bg-slate-500",
            todo: "bg-indigo-500",
            "in-progress": "bg-amber-500",
            review: "bg-violet-500",
            done: "bg-emerald-500",
          }}
          allowAddTask={true}
        />
      </div>
    </div>
  );
};

export default KanbanPage;
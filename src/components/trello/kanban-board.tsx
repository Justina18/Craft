// components/KanbanBoard.tsx
"use client"

import * as React from "react"

export interface KanbanTask {
  id: string
  title: string
  description?: string
  labels?: string[]
  assignee?: string
}

export interface KanbanColumn {
  id: string
  title: string
  tasks: KanbanTask[]
}

interface KanbanBoardProps {
  columns: KanbanColumn[]
  onColumnsChange?: (columns: KanbanColumn[]) => void
  onTaskMove?: (taskId: string, fromColumnId: string, toColumnId: string) => void
  onTaskAdd?: (columnId: string, title: string) => void
  labelColors?: Record<string, string>
  columnColors?: Record<string, string>
  allowAddTask?: boolean
}

const defaultLabelColors: Record<string, string> = {
  research: "bg-pink-500",
  design: "bg-violet-500",
  frontend: "bg-blue-500",
  backend: "bg-emerald-500",
  devops: "bg-amber-500",
  docs: "bg-slate-500",
  urgent: "bg-red-500",
}

const defaultColumnColors: Record<string, string> = {
  backlog: "bg-slate-500",
  todo: "bg-blue-500",
  "in-progress": "bg-amber-500",
  review: "bg-violet-500",
  done: "bg-emerald-500",
}

const KanbanBoard = ({
  columns: initialColumns,
  onColumnsChange,
  onTaskMove,
  onTaskAdd,
  labelColors = defaultLabelColors,
  columnColors = defaultColumnColors,
  allowAddTask = true,
}: KanbanBoardProps) => {
  const [columns, setColumns] = React.useState<KanbanColumn[]>(initialColumns)
  const [draggedTask, setDraggedTask] = React.useState<{
    task: KanbanTask
    sourceColumnId: string
  } | null>(null)
  const [dropTarget, setDropTarget] = React.useState<string | null>(null)
  const [addingCardTo, setAddingCardTo] = React.useState<string | null>(null)
  const [newCardTitle, setNewCardTitle] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (addingCardTo && inputRef.current) {
      inputRef.current.focus()
    }
  }, [addingCardTo])

  const handleDragStart = (task: KanbanTask, columnId: string) => {
    setDraggedTask({ task, sourceColumnId: columnId })
  }

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault()
    setDropTarget(columnId)
  }

  const handleDrop = (targetColumnId: string) => {
    if (!draggedTask || draggedTask.sourceColumnId === targetColumnId) {
      setDraggedTask(null)
      setDropTarget(null)
      return
    }

    const newColumns = columns.map((col) => {
      if (col.id === draggedTask.sourceColumnId) {
        return { ...col, tasks: col.tasks.filter((t) => t.id !== draggedTask.task.id) }
      }
      if (col.id === targetColumnId) {
        return { ...col, tasks: [...col.tasks, draggedTask.task] }
      }
      return col
    })

    setColumns(newColumns)
    onColumnsChange?.(newColumns)
    onTaskMove?.(draggedTask.task.id, draggedTask.sourceColumnId, targetColumnId)
    setDraggedTask(null)
    setDropTarget(null)
  }

  const handleAddCard = (columnId: string) => {
    if (!newCardTitle.trim()) return

    const newTask: KanbanTask = {
      id: `task-${Date.now()}`,
      title: newCardTitle.trim(),
      labels: [],
    }

    const newColumns = columns.map((col) => (col.id === columnId ? { ...col, tasks: [...col.tasks, newTask] } : col))

    setColumns(newColumns)
    onColumnsChange?.(newColumns)
    onTaskAdd?.(columnId, newCardTitle.trim())
    setNewCardTitle("")
    setAddingCardTo(null)
  }

  const getColumnColor = (columnId: string) => columnColors[columnId] || "bg-slate-500"
  const getLabelColor = (label: string) => labelColors[label] || "bg-slate-500"

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map((column) => {
        const isDropActive = dropTarget === column.id && draggedTask?.sourceColumnId !== column.id

        return (
          <div
            key={column.id}
            onDragOver={(e) => handleDragOver(e, column.id)}
            onDrop={() => handleDrop(column.id)}
            onDragLeave={() => setDropTarget(null)}
            className={`min-w-[280px] max-w-[280px] rounded-xl p-3 shadow-[0px_4px_15px_3px_rgba(0,_0,_0,_0.1)] transition-all duration-200 bg-white border-2 ${
              isDropActive ? "border-blue-500 border-dashed bg-blue-500/5" : "border-transparent"
            }`}
          >
            <div className="mb-3 flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded ${getColumnColor(column.id)}`} />
                <h2 className="text-sm font-semibold text-black">{column.title}</h2>
                <span className="rounded-full bg-gray-700 px-2 py-0.5 text-xs font-medium text-gray-300">
                  {column.tasks.length}
                </span>
              </div>
              <button
                className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
                aria-label="Column options"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </button>
            </div>

            <div className="flex min-h-[100px] flex-col gap-2">
              {column.tasks.map((task) => {
                const isDragging = draggedTask?.task.id === task.id

                return (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(task, column.id)}
                    onDragEnd={() => setDraggedTask(null)}
                    className={`cursor-grab rounded-lg bg-[#fff] p-3 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md active:cursor-grabbing ${
                      isDragging && "rotate-2 opacity-50"
                    }`}
                  >
                    {task.labels && task.labels.length > 0 && (
                      <div className="mb-2 flex flex-wrap gap-1">
                        {task.labels.map((label) => (
                          <span
                            key={label}
                            className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase text-white ${getLabelColor(
                              label
                            )}`}
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    )}

                    <h3 className={`text-sm font-medium text-black ${task.description && "mb-1"}`}>{task.title}</h3>

                    {task.description && <p className="mb-2 text-xs text-gray-400">{task.description}</p>}

                    {task.assignee && (
                      <div className="flex justify-end">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-[11px] font-semibold text-white">
                          {task.assignee}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}

              {allowAddTask && (
                <>
                  {addingCardTo === column.id ? (
                    <div className="rounded-lg bg-[#fefefe] p-3 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)]">
                      <input
                        ref={inputRef}
                        type="text"
                        value={newCardTitle}
                        onChange={(e) => setNewCardTitle(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddCard(column.id)}
                        placeholder="Enter card title..."
                        className="mb-2 w-full border-none bg-white text-sm text-black outline-none placeholder:text-gray-500"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddCard(column.id)}
                          className="rounded bg-black px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700"
                        >
                          Add Card
                        </button>
                        <button
                          onClick={() => {
                            setAddingCardTo(null)
                            setNewCardTitle("")
                          }}
                          className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
                          aria-label="Cancel"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setAddingCardTo(column.id)}
                      className="flex w-full items-center justify-center gap-1 rounded-lg p-2 text-sm text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                      Add a card
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default KanbanBoard;
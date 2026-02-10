import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import KanbanBoard from "../../components/KanbanBoard/KanbanBoard";

// mock socket.io-client
vi.mock("../../Context.jsx", () => ({
  useApp: () => ({
    // state
    tasks: [],
    newTask: "",
    description: "",
    category: "bug",
    priority: "medium",
    status: "todo",
    file: null,
    preview: null,

    // setters (no-ops)
    setNewTask: vi.fn(),
    setDescription: vi.fn(),
    setCategory: vi.fn(),
    setPriority: vi.fn(),
    setStatus: vi.fn(),
    setFile: vi.fn(),
    setPreview: vi.fn(),

    // config
    defaultCategories: {
      bug: "bug",
      feature: "feature",
      enhancement: "enhancement",
    },
    defaultPriority: {
      low: "low",
      medium: "medium",
      high: "high",
    },
    defaultStatus: {
      todo: "todo",
      inprogress: "inprogress",
      done: "done",
    },

    // actions
    submitForm: vi.fn(),
  }),
}));

test("Kanban board renders with websocket layer mocked", () => {
  render(
    <DndProvider backend={HTML5Backend}>
      <KanbanBoard />
    </DndProvider>,
  );

  expect(screen.getByText(/create a task/i)).toBeInTheDocument();
});



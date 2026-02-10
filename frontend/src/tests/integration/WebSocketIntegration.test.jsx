import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import KanbanBoard from "../../components/KanbanBoard/KanbanBoard";

// Mock Column to avoid React DnD in unit tests
vi.mock("../../components/Column/Column", () => ({
  default: ({ title }) => <div>{title}</div>,
}));

// Mock application context
vi.mock("../../Context.jsx", () => ({
  useApp: () => ({
    // state
    tasks: [
      { id: "1", title: "Todo Task", status: "todo" },
      { id: "2", title: "Done Task", status: "done" },
    ],
    newTask: "",
    description: "",
    category: "bug",
    priority: "medium",
    status: "todo",
    file: null,
    preview: null,

    // setters
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

    submitForm: vi.fn(),
  }),
}));

describe("KanbanBoard", () => {
  test("renders columns based on board configuration", () => {
    render(<KanbanBoard />);

    expect(screen.getAllByText(/todo/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/done/i).length).toBeGreaterThan(0);
  });
});




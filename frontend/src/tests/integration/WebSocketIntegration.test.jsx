import { render, screen, act } from "@testing-library/react";
import KanbanBoard from "../../components/KanbanBoard";

// Mock socket.io-client
const mockOn = jest.fn();
const mockEmit = jest.fn();

jest.mock("socket.io-client", () => {
  return () => ({
    on: mockOn,
    emit: mockEmit,
    off: jest.fn(),
  });
});

test("UI updates when a task is received via WebSocket", async () => {
  render(<KanbanBoard />);

  // Simulate server sending task via socket
  const socketCallback = mockOn.mock.calls.find(
    ([event]) => event === "task:create"
  )[1];

  act(() => {
    socketCallback({
      id: "1",
      title: "Socket Task",
      status: "todo",
    });
  });

  expect(await screen.findByText("Socket Task")).toBeInTheDocument();
});


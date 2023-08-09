import React from "react";
import { it, vi, expect, afterEach, beforeAll, afterAll } from "vitest";
import { render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import App from "./App.jsx";

const server = setupServer();

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

it("displays tasks from the api", async () => {
  server.use(
    rest.get("/api/tasks", (req, res, ctx) => {
      return res(
        ctx.json([
          { id: 1, description: "Do the dishes" },
          { id: 2, description: "Mow the lawn" },
        ])
      );
    })
  );
  const { findByText } = render(<App />);
  await findByText("Do the dishes");
  await findByText("Mow the lawn");
});

it("deletes a task when clicked", async () => {
  server.use(
    rest.get("/api/tasks", (req, res, ctx) => {
      return res(ctx.json([{ id: 3, description: "Do the dishes" }]));
    })
  );
  const { findByText } = render(<App />);
  const spy = vi.fn();

  await findByText("Do the dishes");
  server.use(
    rest.delete("/api/tasks/3", (req, res, ctx) => {
      spy();
      return res(ctx.status(204));
    })
  );
  server.use(rest.get("/api/tasks", (req, res, ctx) => res(ctx.json([]))));

  const deleteButton = await findByText("X");

  userEvent.click(deleteButton);

  await findByText("No Tasks Remaining");

  expect(spy).toHaveBeenCalled();
});

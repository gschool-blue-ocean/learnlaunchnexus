import React from "react";
import { it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter.jsx";

// Clear out DOM after each test so they are independent.
afterEach(cleanup);

it("increments count when increment button is clicked", async () => {
  // Render the component with react-testing-library
  // https://testing-library.com/docs/react-testing-library/api#render
  const { getByText, getByTestId } = render(<Counter />);

  // Get count value and make initial assertion
  const count = getByTestId("count");
  expect(count.textContent).toBe("0");

  // Get increment button DOM node
  const incrementButton = getByText("+");

  // Simulate click event on increment button
  await userEvent.click(incrementButton);

  // Assert that count value has been updated to 1
  expect(count.textContent).toBe("1");
});

it("decrements count when increment button is clicked", async () => {
  const { getByText, getByTestId } = render(<Counter />);

  const count = getByTestId("count");
  expect(count.textContent).toBe("0");

  const decrementButton = getByText("-");

  await userEvent.click(decrementButton);

  expect(count.textContent).toBe("-1");
});

import { render, screen, fireEvent } from "@testing-library/react";
import Checkbox from "./Checkbox";

test("checkbox is disabled when passed as a prop", () => {
  render(<Checkbox disabled />);
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).toBeDisabled();
});

test("does not call onChange when disabled", () => {
  const handleChange = jest.fn();
  render(<Checkbox onChange={handleChange} disabled />);
  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);
  expect(handleChange).not.toHaveBeenCalled();
});

test("checkbox is required when passed as a prop", () => {
  render(<Checkbox required />);
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).toBeRequired();
});

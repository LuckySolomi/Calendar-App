import { render, screen, fireEvent } from "@testing-library/react";
import Input from "./Input";

test("renders the input with provided placeholder and label text", () => {
  render(
    <Input name="username" text="Username" placeholder="Enter your username" />
  );
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText(/enter your username/i)
  ).toBeInTheDocument();
});

test("allows input value to be updated", () => {
  render(
    <Input name="username" text="Username" placeholder="Enter your name" />
  );
  const input = screen.getByPlaceholderText(/enter your name/i);
  fireEvent.change(input, { target: { value: "Solomiia Pitsur" } });
  expect(input.value).toBe("Solomiia Pitsur");
});

test("toggles password visibility when ee icon clicked", () => {
  render(<Input name="password" text="Password" type="password" />);
  const input = screen.getByLabelText(/password/i);
  const toggleButton = screen.getByRole("button");
  expect(input).toHaveAttribute("type", "password");

  fireEvent.click(toggleButton);
  expect(input).toHaveAttribute("type", "text");

  fireEvent.click(toggleButton);
  expect(input).toHaveAttribute("type", "password");
});

test("display an error message if validation fails", () => {
  const validateMock = (value) => (value ? "" : "this field is required");
  render(
    <Input
      name="email"
      text="Email"
      placeholder="Enter your email"
      required
      validate={validateMock}
    />
  );

  const input = screen.getByPlaceholderText(/enter your email/i);

  fireEvent.blur(input);
  expect(screen.getByText(/this field is required/i)).toBeInTheDocument();

  fireEvent.change(input, { target: { value: "test@example.com" } });
  fireEvent.blur(input);
  expect(screen.queryByText(/this field is required/i)).not.toBeInTheDocument();
});

test("disables input and toggle button when disabled prop is true", () => {
  render(<Input name="password" text="Password" type="password" disabled />);

  const input = screen.getByLabelText(/password/i);
  const toggleButton = screen.getByRole("button");

  expect(input).toBeDisabled();
  expect(toggleButton).toBeDisabled();
});

test("applies error class when validation fails", () => {
  const validateMock = () => "Invalid input";

  render(
    <Input
      name="test"
      text="Test"
      placeholder="Enter test"
      required
      validate={validateMock}
    />
  );

  const input = screen.getByPlaceholderText(/enter test/i);

  fireEvent.blur(input);
  expect(input).toHaveClass("inputError");
});

test("marks input as required when required prop is true", () => {
  render(
    <Input
      name="username"
      text="Username"
      placeholder="Enter your name"
      required
    />
  );

  const input = screen.getByPlaceholderText(/enter your name/i);
  expect(input).toBeRequired();
});

import { render, screen, fireEvent } from "@testing-library/react";
import CustomSelect from "./CustomSelect";

test("render the CustomSelect with placeholder", () => {
  render(<CustomSelect placeholder="Select a day" days={[]} />);
  const placeholder = screen.getByText(/select a day/i);
  expect(placeholder).toBeInTheDocument();
});

test("opens the dropdown on click and closes after selecting an option", () => {
  const days = [{ value: "mon", label: "Monday" }];
  render(<CustomSelect placeholder="Select a day" days={days} />);

  const select = screen.getByText(/select a day/i);
  fireEvent.click(select);

  const option = screen.getByText(/monday/i);
  expect(option).toBeInTheDocument();

  fireEvent.click(option);

  expect(screen.queryByRole("list")).not.toBeInTheDocument();
  expect(screen.queryByText(/monday/i)).toBeInTheDocument();
});

test("selects an option and calls onSelect callback", () => {
  const onSelect = jest.fn();
  const days = [
    { value: "mon", label: "Monday" },
    { value: "tue", label: "Tuesday" },
  ];
  render(
    <CustomSelect placeholder="Select a day" days={days} onSelect={onSelect} />
  );

  const select = screen.getByText(/select a day/i);
  fireEvent.click(select);

  const option = screen.getByText(/monday/i);
  fireEvent.click(option);

  expect(screen.getByText(/monday/i)).toBeInTheDocument();
  expect(onSelect).toHaveBeenCalledWith("day", "mon");
});

test("does not open dropdown when disabled", () => {
  render(<CustomSelect placeholder="Select a day" days={[]} disabled={true} />);
  const select = screen.getByText(/select a day/i);
  fireEvent.click(select);
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});

test("renders all days passed as props", () => {
  const days = [
    { value: "mon", label: "Monday" },
    { value: "tue", label: "Tuesday" },
  ];
  render(<CustomSelect placeholder="Select a day" days={days} />);

  const select = screen.getByText(/select a day/i);
  fireEvent.click(select);

  const options = screen.getAllByRole("listitem");
  expect(options).toHaveLength(days.length);
  expect(screen.getByText(/monday/i)).toBeInTheDocument();
  expect(screen.getByText(/tuesday/i)).toBeInTheDocument();
});

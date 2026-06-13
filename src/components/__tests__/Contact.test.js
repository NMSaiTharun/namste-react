import { Contact } from "../Contact";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

test("Should Load Contact us component", () => {
  render(<Contact />);
  const heading = screen.getByRole("heading");
  //console.log(heading);
  expect(heading).toBeInTheDocument();
});

test("Should Load button inside contact component", () => {
  render(<Contact />);
  const button = screen.getByRole("button");
  //console.log(heading);
  expect(button).toBeInTheDocument();
});

test("Should check submit text inside contact component", () => {
  render(<Contact />);
  const button = screen.getByText("Submit");
  //console.log(heading);
  expect(button).toBeInTheDocument();
});

test("Should load 2 input boxes on the Contact component", () => {
  render(<Contact />);
  const inputBoxes = screen.getAllByRole("textbox");
  //console.log(heading);
  expect(inputBoxes.length).toBe(3);
});

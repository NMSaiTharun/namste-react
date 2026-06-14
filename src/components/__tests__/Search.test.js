import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Body from "../Body";
import { BrowserRouter } from "react-router-dom";
import MOCK_DATA from "../mocks/mockResListData.json";
import { act } from "react-dom/test-utils";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

it("Should render the Body Component with Search Button", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>,
    ),
  );
  const searchBtn = screen.getByRole("button", { name: "Search" });
  expect(searchBtn).toBeInTheDocument();

  const searchInput = screen.getByTestId("searchInput");
  fireEvent.change(searchInput, { target: { value: "burger" } });

  fireEvent.click(searchBtn);

  const cards = screen.getAllByTestId("resCard");
  expect(cards.length).toBe(4);
});

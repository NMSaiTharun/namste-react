import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import RestaurantMenu from "../RestaurantMenu";
import Header from "../Header";
import Cart from "../Cart";
import MOCK_DATA from "../../utils/menu.json";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import { BrowserRouter } from "react-router";
import "@testing-library/jest-dom";

const MENU_ITEM_COUNT = 17;

const renderApp = async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
          <RestaurantMenu />
          <Cart />
        </Provider>
      </BrowserRouter>,
    ),
  );
  fireEvent.click(screen.getByText(`Recommended (${MENU_ITEM_COUNT})`));
};

// Each click targets the first item that is still showing ADD, so distinct
// menu items land in the cart.
const addFirstAvailableItem = () =>
  fireEvent.click(screen.getAllByRole("button", { name: "ADD" })[0]);

it("should add distinct items to the cart and total their quantities", async () => {
  await renderApp();

  expect(screen.getAllByTestId("foodItems").length).toBe(MENU_ITEM_COUNT);

  addFirstAvailableItem();
  addFirstAvailableItem();
  addFirstAvailableItem();

  // Bump the first item to a quantity of 2, so units (4) and lines (3) differ.
  fireEvent.click(screen.getAllByRole("button", { name: /^Increase quantity/ })[0]);

  expect(screen.getByText("🛒 Cart (4)")).toBeInTheDocument();

  // 17 menu rows plus 3 distinct cart lines.
  expect(screen.getAllByTestId("foodItems").length).toBe(MENU_ITEM_COUNT + 3);

  fireEvent.click(screen.getByRole("button", { name: "Clear All" }));
  expect(screen.getAllByTestId("foodItems").length).toBe(MENU_ITEM_COUNT);
  expect(screen.getByText("🛒 Cart (0)")).toBeInTheDocument();
});

it("should swap ADD for a quantity stepper and back again at zero", async () => {
  await renderApp();

  const addButtonsBefore = screen.getAllByRole("button", { name: "ADD" }).length;
  addFirstAvailableItem();

  // ADD is replaced by the stepper for that item, in both menu and cart.
  expect(screen.getAllByRole("button", { name: "ADD" }).length).toBe(
    addButtonsBefore - 1,
  );
  expect(screen.getAllByTestId("itemQuantity")[0]).toHaveTextContent("1");
  expect(screen.getByText("🛒 Cart (1)")).toBeInTheDocument();

  // Increment, then decrement twice to walk it back down to zero.
  fireEvent.click(screen.getAllByRole("button", { name: /^Increase quantity/ })[0]);
  expect(screen.getAllByTestId("itemQuantity")[0]).toHaveTextContent("2");

  fireEvent.click(screen.getAllByRole("button", { name: /^Decrease quantity/ })[0]);
  expect(screen.getAllByTestId("itemQuantity")[0]).toHaveTextContent("1");

  fireEvent.click(screen.getAllByRole("button", { name: /^Decrease quantity/ })[0]);

  // Back to zero: the stepper is gone and ADD has returned.
  expect(screen.queryAllByTestId("itemQuantity").length).toBe(0);
  expect(screen.getAllByRole("button", { name: "ADD" }).length).toBe(
    addButtonsBefore,
  );
  expect(screen.getByText("🛒 Cart (0)")).toBeInTheDocument();
});

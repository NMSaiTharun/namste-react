import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import RestaurantMenu from "../RestaurantMenu";
import Header from "../Header";
import Cart from "../Cart";
import MOCK_DATA from "../../utils/menu.json";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
// Not needed below fetch since I am not using fetch while fetching the data, I am using hardcoded data
// global.fetch = jest.fn(() => {
//   return Promise({
//     json: Promise.resolve(MOCK_DATA),
//   });
// });

it("should load restaurant menu component", async () => {
  //the act is for useEffect,useState hooks
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
  const accordianHeader = screen.getByText("Recommended (17)");
  fireEvent.click(accordianHeader);

  expect(screen.getAllByTestId("foodItems").length).toBe(17);

  const addBtns = screen.getAllByRole("button", { name: "ADD" });
  fireEvent.click(addBtns[0]);
  fireEvent.click(addBtns[2]);

  fireEvent.click(addBtns[5]);
  fireEvent.click(addBtns[5]);

  const cartText = screen.getByText("🛒 Cart (4)");
  expect(cartText).toBeInTheDocument();

  expect(screen.getAllByTestId("foodItems").length).toBe(21);
  fireEvent.click(screen.getByRole("button", { name: "Clear All" }));
  expect(screen.getAllByTestId("foodItems").length).toBe(17);
});

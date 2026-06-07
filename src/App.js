import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import Error from "./components/Error";
// const heading = React.createElement(
//   "h1",
//   { id: "heading", xyz: "abc" },
//   "Hello World from React!",
// );

// // JSX is HTML-like syntax used in React to describe the UI structure.
// // JSX (transpiled before it reaches the JS) - PARCEL - BABEL
// // JSX => React.createElement =>React Element - JS Object => HTMLElement(DOM)

// // React Element
// const TitleComponent = (
//   <h1 id="heading" xyz="abc" className="head" tabIndex="5">
//     Hello World from JSX!
//   </h1>
// );

// // React Functional Component
// // Component Composition - A component can be used inside another component
// const FunctionalComponent = function () {
//   return (
//     <div id="container">
//       {TitleComponent}
//       <h1>React Functional Component </h1>
//       <ArrowFunctionalComponent2></ArrowFunctionalComponent2>
//       <ArrowFunctionalComponent2 />
//       {ArrowFunctionalComponent2()}
//     </div>
//   );
// };
// const number = 13;
// const ArrowFunctionalComponent2 = () => (
//   <div id="container">
//     <h2>Sum of 100 and 200 is {100 + 200}</h2>
//     {TitleComponent}
//     {TitleComponent}
//     <h1>React Functional Component </h1>
//   </div>
// );

// console.log(TitleComponent);
// console.log(FunctionalComponent);

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout></AppLayout>,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
    errorElement: <Error />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);

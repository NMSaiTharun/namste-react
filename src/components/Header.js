import { LOGO_URL } from "../utils/constants";
import { use, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
const Header = () => {
  const [loginBtn, setLoginBtn] = useState("Login");
  console.log("online/offline check");
  return (
    <div className="flex justify-between bg-red-600 shadow-lg">
      <div className="">
        <img className="w-56" alt="Food App Logo" src={LOGO_URL}></img>
      </div>
      <div className="flex items-center">
        <ul className="flex p-4 m-4">
          <li className="px-4 text-2xl font-bold">
            Online Status: {useOnlineStatus() ? "✅" : "❌"}
          </li>
          <li className="px-4 text-2xl font-bold">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4 text-2xl font-bold">
            <Link to="/Grocery">Grocery</Link>
          </li>
          <li className="px-4 text-2xl font-bold">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-4 text-2xl font-bold">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="px-4 text-2xl font-bold">Cart</li>
          <button
            className="text-2xl font-bold"
            onClick={() => {
              loginBtn == "Login"
                ? setLoginBtn("Logout")
                : setLoginBtn("Login");
            }}
          >
            {loginBtn}
          </button>
        </ul>
      </div>
    </div>
  );
};
export default Header;

import { LOGO_URL } from "../utils/constants";
import { use, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
const Header = () => {
  const [loginBtn, setLoginBtn] = useState("Login");
  console.log("online/offline check");
  return (
    <div className="flex justify-between items-center bg-red-500 px-6 py-3 shadow-md sticky top-0 z-50">
      <div>
        <img className="w-24" alt="Food App Logo" src={LOGO_URL} />
      </div>
      <div className="flex items-center gap-6">
        <ul className="flex items-center gap-6">
          <li className="text-lg font-medium text-white">
            {useOnlineStatus() ? "🟢 Online" : "🔴 Offline"}
          </li>
          <li className="text-lg font-medium text-white hover:text-orange-300 transition-colors">
            <Link to="/">Home</Link>
          </li>
          <li className="text-lg font-medium text-white hover:text-orange-300 transition-colors">
            <Link to="/Grocery">Grocery</Link>
          </li>
          <li className="text-lg font-medium text-white hover:text-orange-300 transition-colors">
            <Link to="/about">About Us</Link>
          </li>
          <li className="text-lg font-medium text-white hover:text-orange-300 transition-colors">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="text-lg font-medium text-white hover:text-orange-300 transition-colors cursor-pointer">
            🛒 Cart
          </li>
        </ul>
        <button
          className="bg-white hover:bg-orange-300 text-red-500 text-lg font-semibold px-4 py-2 rounded-full transition-colors"
          onClick={() => {
            loginBtn == "Login" ? setLoginBtn("Logout") : setLoginBtn("Login");
          }}
        >
          {loginBtn}
        </button>
      </div>
    </div>
  );
};
export default Header;

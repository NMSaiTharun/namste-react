import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";
import { removeItem } from "../utils/cartSlice";

const Cart = () => {
  const cartSelector = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  console.log(cartSelector);
  return (
    <div className="text-center m-4 p-4">
      <h1 className="text-2xl font-bold">Cart Items</h1>
      <div className="w-6/12 m-auto">
        <button
          className="m-2 p-2  bg-red-700 rounded-lg text-xl  text-white  cursor-pointer hover:bg-gray-400"
          onClick={() => {
            //dispatch(removeItem());
            dispatch(clearCart());
          }}
        >
          Clear All
        </button>
        {cartSelector.length == 0 && (
          <h1 className="text-xl font-bold">
            Cart is empty, please add items to the cart!
          </h1>
        )}
        <ItemList items={cartSelector} />
      </div>
    </div>
  );
};
export default Cart;

import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart, selectCartCount } from "../utils/cartSlice";

const Cart = () => {
  const cartSelector = useSelector((store) => store.cart.items);
  const cartCount = useSelector(selectCartCount);
  const dispatch = useDispatch();
  const totalPrice = cartSelector.reduce(
    (total, item) =>
      total +
      ((item.card.info.price || item.card.info.defaultPrice) / 100) *
        item.quantity,
    0,
  );
  return (
    <div className="text-center m-2 sm:m-4 p-2 sm:p-4">
      <h1 className="text-xl sm:text-2xl font-bold">Cart Items</h1>
      <div className="w-full md:w-8/12 lg:w-6/12 mx-auto px-2">
        <button
          className="m-2 p-2 bg-red-700 rounded-lg text-base sm:text-xl text-white cursor-pointer hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={cartSelector.length === 0}
          onClick={() => {
            dispatch(clearCart());
          }}
        >
          Clear All
        </button>
        {cartSelector.length == 0 ? (
          <h1 className="text-base sm:text-xl font-bold">
            Cart is empty, please add items to the cart!
          </h1>
        ) : (
          <p className="text-base sm:text-lg font-semibold">
            {cartCount} {cartCount === 1 ? "item" : "items"} · ₹
            {totalPrice.toFixed(2)}
          </p>
        )}
        <ItemList items={cartSelector} />
      </div>
    </div>
  );
};
export default Cart;

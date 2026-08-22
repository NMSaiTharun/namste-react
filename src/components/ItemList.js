import { useDispatch, useSelector } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem, removeItem, getItemId } from "../utils/cartSlice";
const getRatingColor = (rating) => {
  if (rating >= 4) return "text-green-800";
  if (rating >= 3) return "text-green-400";
  return "text-yellow-400";
};

const ItemList = ({ items }) => {
  const dispatch = useDispatch();
  // Reading quantities straight from the store lets this component serve both
  // the menu and the cart without either caller passing anything extra.
  const cartItems = useSelector((store) => store.cart.items);
  const getQuantity = (item) =>
    cartItems.find((cartItem) => getItemId(cartItem) === getItemId(item))
      ?.quantity ?? 0;

  const handleAddItem = (item) => {
    // dispatch an action
    dispatch(addItem(item));
  };
  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };
  return (
    <div>
      <div>
        {items.map((item) => {
          const quantity = getQuantity(item);
          const itemName = item.card.info.name;
          return (
            <div
              key={item.card.info.id}
              data-testid="foodItems"
              className="py-2 my-2 border-b-4 border-gray-200 text-left"
            >
              <div className="flex justify-between gap-2 sm:gap-4">
                <div className="p-1 sm:p-2 flex flex-col w-8/12 sm:w-9/12">
                  {item.card.info.isVeg ? (
                    <span className="w-5 h-5 border-2 border-green-600 flex items-center justify-center shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-600"></span>
                    </span>
                  ) : (
                    <span className="w-5 h-5 border-2 border-red-600 flex items-center justify-center shrink-0">
                      <span className="text-red-600 text-xs">▲</span>
                    </span>
                  )}
                  <span className="font-bold text-base sm:text-xl md:text-2xl break-words">
                    {itemName}
                  </span>
                  <span className="text-sm sm:text-lg md:text-xl font-semibold">
                    ₹
                    {(item.card.info.price || item.card.info.defaultPrice) / 100}
                  </span>
                  <div className="flex flex-wrap items-center">
                    <span
                      className={`${getRatingColor(item.card.info.ratings?.aggregatedRating?.rating)} flex items-center gap-1 text-sm sm:text-lg font-semibold`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                      </svg>
                      {item.card.info.ratings?.aggregatedRating?.rating}
                    </span>
                    <span className="text-gray-600 pt-0.5 pl-1 text-sm sm:text-base">
                      ({item.card.info.ratings?.aggregatedRating?.ratingCountV2})
                    </span>
                  </div>
                  <p className="font-monospace text-sm sm:text-[18px] text-gray-800 break-words">
                    {item.card.info.description}
                  </p>
                </div>
                <div className="w-4/12 sm:w-3/12 relative shrink-0">
                  <img
                    className="rounded-lg w-full object-cover"
                    alt={itemName}
                    src={CDN_URL + item.card.info.imageId}
                  />
                  {quantity === 0 ? (
                    <button
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-white text-green-600 font-bold text-base sm:text-xl px-4 sm:px-6 py-1 rounded-lg shadow-md w-24 sm:w-32 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleAddItem(item)}
                    >
                      ADD
                    </button>
                  ) : (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center justify-between bg-white text-green-600 font-bold rounded-lg shadow-md w-24 sm:w-32 overflow-hidden">
                      <button
                        className="px-3 sm:px-4 py-1 text-lg sm:text-xl hover:bg-gray-200 cursor-pointer"
                        aria-label={`Decrease quantity of ${itemName}`}
                        onClick={() => handleRemoveItem(item)}
                      >
                        −
                      </button>
                      <span
                        data-testid="itemQuantity"
                        className="text-base sm:text-xl select-none"
                      >
                        {quantity}
                      </span>
                      <button
                        className="px-3 sm:px-4 py-1 text-lg sm:text-xl hover:bg-gray-200 cursor-pointer"
                        aria-label={`Increase quantity of ${itemName}`}
                        onClick={() => handleAddItem(item)}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ItemList;

import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";
const getRatingColor = (rating) => {
  if (rating >= 4) return "text-green-800";
  if (rating >= 3) return "text-green-400";
  return "text-yellow-400";
};

const ItemList = ({ items }) => {
  const dispatch = useDispatch();
  const handleAddItem = () => {
    // dispatch an action
    dispatch(addItem("pizza"));
  };
  return (
    <div>
      <div>
        {items.map((item) => (
          <div
            key={item.card.info.id}
            className="py-2 my-2 border-b-4 border-gray-200 text-left"
          >
            <div className="flex justify-between">
              <div className="p-2 flex flex-col w-9/12">
                {item.card.info.isVeg ? (
                  <span className="w-5 h-5 border-2 border-green-600 flex items-center justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-600"></span>
                  </span>
                ) : (
                  <span className="w-5 h-5 border-2 border-red-600 flex items-center justify-center">
                    <span className="text-red-600 text-xs">▲</span>
                  </span>
                )}
                <span className="font-bold text-2xl">
                  {item.card.info.name}
                </span>
                <span className="text-xl font-semibold">
                  ₹{(item.card.info.price || item.card.info.defaultPrice) / 100}
                </span>
                <div className="flex">
                  <span
                    className={`${getRatingColor(item.card.info.ratings?.aggregatedRating?.rating)} flex items-center gap-1 text-lg font-semibold`}
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
                  <span className="text-gray-600 pt-0.5 pl-1">
                    ({item.card.info.ratings?.aggregatedRating?.ratingCountV2})
                  </span>
                </div>
                <p className="font-monospace text-[18px] text-gray-800">
                  {item.card.info.description}
                </p>
              </div>
              <div className="w-3/12 relative">
                <img
                  className="rounded-lg"
                  src={CDN_URL + item.card.info.imageId}
                />
                <button
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-white text-green-600 font-bold text-xl px-6 py-1 rounded-lg shadow-md w-32 hover:bg-gray-200 text cursor-pointer"
                  onClick={handleAddItem}
                >
                  ADD
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ItemList;

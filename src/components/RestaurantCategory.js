import { useState } from "react";
import ItemList from "./ItemList";
const RestaurantCategory = (props) => {
  const [showItems, setShowItems] = useState(false);
  const categories = props.data;
  const handleClick = () => {
    props.changeShowIndex();
  };
  return (
    <div>
      <div className="w-full md:w-8/12 lg:w-6/12 mx-auto my-4 bg-gray-50 shadow-2xl p-3 sm:p-4">
        <div
          className="flex justify-between items-center gap-2 cursor-pointer"
          onClick={() => handleClick(props.index)}
        >
          {" "}
          <span className="font-bold text-lg sm:text-2xl text-left">
            {categories?.title} ({categories?.itemCards?.length})
          </span>
          <span className="text-2xl sm:text-3xl shrink-0">⬇️</span>
        </div>

        {props.showItems && <ItemList items={categories?.itemCards || []} />}
      </div>
    </div>
  );
};
export default RestaurantCategory;

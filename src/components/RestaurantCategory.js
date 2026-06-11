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
      <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-2xl p-4">
        <div
          className="flex justify-between cursor-pointer"
          onClick={() => handleClick(props.index)}
        >
          {" "}
          <span className="font-bold text-2xl">
            {categories?.title} ({categories?.itemCards?.length})
          </span>
          <span className="text-3xl">⬇️</span>
        </div>

        {props.showItems && <ItemList items={categories?.itemCards || []} />}
      </div>
    </div>
  );
};
export default RestaurantCategory;

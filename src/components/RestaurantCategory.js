import ItemList from "./ItemList";
const RestaurantCategory = (props) => {
  const categories = props.data;
  return (
    <div>
      <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4">
        <div className="flex justify-between">
          {" "}
          <span className="font-bold text-2xl">
            {categories?.title} ({categories?.itemCards?.length})
          </span>
          <span className="text-3xl">⬇️</span>
        </div>

        <ItemList items={categories?.itemCards || []} />
      </div>
    </div>
  );
};
export default RestaurantCategory;

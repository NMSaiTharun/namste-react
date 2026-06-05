import RestaurantCard from "./RestaurantCard";
import resObj from "../utils/mockData";
const Body = () => {
  return (
    <div className="body">
      <div className="search">Search</div>
      <div
        className="res-container"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {resObj.map((restaurant, index) => (
          <RestaurantCard
            key={restaurant.card.card.info.id}
            resData={restaurant}
          />
        ))}
      </div>
    </div>
  );
};

export default Body;

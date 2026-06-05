import RestaurantCard from "./RestaurantCard";
import resObj from "../utils/mockData";
import { useState } from "react";

const Body = () => {
  const [restaurantObject, setRestaurantObject] = useState(resObj);
  return (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            console.log(restaurantObject);
            let filteredRestaurantObject = restaurantObject.filter(
              (a) => a.card.card.info.avgRating > 4,
            );
            console.log(filteredRestaurantObject);
            setRestaurantObject(filteredRestaurantObject);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div
        className="res-container"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {restaurantObject.map((restaurant, index) => (
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

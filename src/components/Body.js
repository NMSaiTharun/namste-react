import RestaurantCard from "./RestaurantCard";
import resObj from "../utils/mockData";
import { useState, useEffect } from "react";

const Body = () => {
  const [restaurantObject, setRestaurantObject] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.956924&lng=77.701127&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
    );

    const jsonData = await data.json();
    setRestaurantObject(
      jsonData.data.cards[1].card.card.gridElements.infoWithStyle.restaurants,
    );
  };
  return (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            console.log(restaurantObject);
            let filteredRestaurantObject = restaurantObject.filter(
              (a) => a.info.avgRating > 4,
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
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;

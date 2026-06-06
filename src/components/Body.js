import RestaurantCard from "./RestaurantCard";
import resObj from "../utils/mockData";
import { useState, useEffect, use } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  console.log("I am Body component");
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    console.log("fetching data from API");
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.956924&lng=77.701127&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
    );

    const jsonData = await data.json();
    setListOfRestaurants(
      jsonData.data.cards[1].card.card.gridElements.infoWithStyle.restaurants,
    );
    setFilteredRestaurants(
      jsonData.data.cards[1].card.card.gridElements.infoWithStyle.restaurants,
    );
  };
  // Conditional Rendering
  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <input
          type="text"
          className="search"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          value={searchText}
        />
        <button
          className="search-btn"
          onClick={() => {
            console.log(searchText);
            console.log(listOfRestaurants);
            let filteredRestaurant = listOfRestaurants.filter((a) =>
              a.info.name.toLowerCase().includes(searchText.toLowerCase()),
            );
            console.log(filteredRestaurant);
            setFilteredRestaurants(filteredRestaurant);
          }}
        >
          Search
        </button>
        <button
          className="filter-btn"
          onClick={() => {
            console.log(listOfRestaurants);
            let filteredList = listOfRestaurants.filter(
              (a) => a.info.avgRating > 4,
            );
            console.log(filteredList);
            setFilteredRestaurants(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div
        className="res-container"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {filteredRestaurants.map((restaurant, index) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;

import RestaurantCard from "./RestaurantCard";
import resObj from "../utils/mockData";
import { useState, useEffect, use } from "react";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";
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
      "/api/dapi/restaurants/list/v5?lat=12.956924&lng=77.701127&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
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
  const onlineStatus = useOnlineStatus();
  console.log(onlineStatus);
  if (onlineStatus == false) {
    return (
      <h1>Looks Like you're offline, please check internet connection!</h1>
    );
  }

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className="search m-4 p-4">
          <input
            type="text"
            value={searchText}
            className="search border border-gray-300 m-4 p-4 rounded-lg"
            onChange={(e) => {
              setSearchText(e.target.value);
              let filteredRestaurant = listOfRestaurants.filter((a) =>
                a.info.name.toLowerCase().includes(searchText.toLowerCase()),
              );
              setFilteredRestaurants(filteredRestaurant);
            }}
            onKeyDown={(e) => {
              console.log("Enter Event");
              if (e.key === "Enter") {
                let filteredRestaurant = listOfRestaurants.filter((a) =>
                  a.info.name.toLowerCase().includes(searchText.toLowerCase()),
                );
                setFilteredRestaurants(filteredRestaurant);
              }
            }}
          />
          <button
            className="px-4 py-2 bg-green-600 m-4 rounded-lg cursor-pointer"
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
        </div>
        <div className="search m-4 p-4 flex items-center">
          <button
            className="px-4 py-2 bg-gray-600 m-4 rounded-lg cursor-pointer"
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
      </div>
      <div className="flex flex-wrap">
        {filteredRestaurants.map((restaurant, index) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;

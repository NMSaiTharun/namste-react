import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import resObj from "../utils/mockData";
import { useState, useEffect, use } from "react";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";
const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await fetch(
      "/api/dapi/restaurants/list/v5?lat=12.956924&lng=77.701127&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
    );

    const jsonData = await data.json();
    setListOfRestaurants(
      jsonData.data.cards[1].card.card.gridElements.infoWithStyle.restaurants,
    );
    // console.log("The json data is: {0}", jsonData);
    setFilteredRestaurants(
      jsonData.data.cards[1].card.card.gridElements.infoWithStyle.restaurants,
    );
  };
  // Conditional Rendering
  const onlineStatus = useOnlineStatus();
  //console.log(onlineStatus);
  if (onlineStatus == false) {
    return (
      <h1 className="text-center text-lg font-bold p-4">
        Looks Like you&apos;re offline, please check internet connection!
      </h1>
    );
  }

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex flex-col sm:flex-row sm:flex-wrap sm:items-center px-3">
        <div className="search flex flex-col sm:flex-row sm:items-center gap-2 my-2 sm:m-4 sm:p-4 w-full sm:w-auto">
          <input
            type="text"
            data-testid="searchInput"
            value={searchText}
            className="search border border-gray-300 p-3 sm:p-4 rounded-lg w-full sm:w-auto"
            onChange={(e) => {
              setSearchText(e.target.value);
              let filteredRestaurant = listOfRestaurants.filter((a) =>
                a.info.name.toLowerCase().includes(searchText.toLowerCase()),
              );
              setFilteredRestaurants(filteredRestaurant);
            }}
            onKeyDown={(e) => {
              // console.log("Enter Event");
              if (e.key === "Enter") {
                let filteredRestaurant = listOfRestaurants.filter((a) =>
                  a.info.name.toLowerCase().includes(searchText.toLowerCase()),
                );
                setFilteredRestaurants(filteredRestaurant);
              }
            }}
          />
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer w-full sm:w-auto"
            onClick={() => {
              //console.log(searchText);
              // console.log(listOfRestaurants);
              let filteredRestaurant = listOfRestaurants.filter((a) =>
                a.info.name.toLowerCase().includes(searchText.toLowerCase()),
              );
              // console.log(filteredRestaurant);
              setFilteredRestaurants(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <div className="search my-2 sm:m-4 sm:p-4 flex items-center w-full sm:w-auto">
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded-lg cursor-pointer w-full sm:w-auto"
            onClick={() => {
              //console.log(listOfRestaurants);
              let filteredList = listOfRestaurants.filter(
                (a) => a.info.avgRating > 4,
              );
              //console.log(filteredList);
              setFilteredRestaurants(filteredList);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-3 sm:p-4">
        {filteredRestaurants.map((restaurant, index) =>
          true ? (
            <RestaurantCardPromoted
              key={restaurant.info.id}
              resData={restaurant}
            />
          ) : (
            <RestaurantCard key={restaurant.info.id} resData={restaurant} />
          ),
        )}
      </div>
    </div>
  );
};

export default Body;

import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import restaurantMenuData from "../utils/menu.json";
import { CDN_URL } from "../utils/constants";
import RestaurantCategory from "./RestaurantCategory";
const RestaurantMenu = () => {
  //const [resInfo, setResInfo] = useState(null);
  //   useEffect(() => {
  //     fetchMenu();
  //   }, []);
  //   const fetchMenu = async () => {
  //     const restaurantData = await fetch(
  //       "/api/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.956924&lng=77.701127&restaurantId=716563&catalog_qa=undefined&submitAction=ENTER",
  //     );
  //     console.log(restaurantData);
  //     const jsonData = await restaurantData.json();
  //     console.log(jsonData);
  //     // setResInfo(
  //     //   jsonData.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[1].card.card
  //     //     .itemCards,
  //     // );
  //   };
  //   //if (resInfo === null) {
  //   //return <Shimmer />;
  //   //}

  const [restaurantData, setRestaurantData] = useState(null);
  const [categoriesData, setCategoriesData] = useState(null);
  const [showIndex, setShowIndex] = useState(null);

  useEffect(() => {
    const menuData = restaurantMenuData;
    setRestaurantData(menuData);
    const categoriesDataFromMenuData =
      menuData?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (a) =>
          a.card?.card?.["@type"] ==
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
      );
    setCategoriesData(categoriesDataFromMenuData);
  }, []);
  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">
        {restaurantData?.data?.cards[2]?.card?.card?.info?.name}
      </h1>
      <p className="font-bold text-lg">
        {restaurantData?.data?.cards[2]?.card?.card?.info?.cuisines.join(",")}{" "}
        {" | "}
        {restaurantData?.data?.cards[2]?.card?.card?.info?.costForTwoMessage}
      </p>
      {categoriesData?.map((category, index) => (
        <RestaurantCategory
          key={category?.card?.card?.title}
          data={category?.card?.card}
          showItems={index == showIndex}
          changeShowIndex={() =>
            setShowIndex(showIndex == index ? null : index)
          }
        />
      ))}
    </div>
  );
};
export default RestaurantMenu;

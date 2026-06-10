import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import restaurantMenuData from "../utils/menu.json";
import { CDN_URL } from "../utils/constants";
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
  useEffect(() => {
    const menuData = restaurantMenuData;
    setRestaurantData(menuData);
  }, []);
  return (
    <div className="menu">
      <h1 className="text-4xl font-extrabold">
        Name of the Restaurant :{" "}
        {restaurantData?.data?.cards[0]?.card?.card?.text}
      </h1>
      <h2 className="text-3xl font-bold">Recommended items are:</h2>

      {restaurantData?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards.map(
        (item) => {
          return (
            <div key={item.card.info.id} className="">
              <h1 className="text-2xl font-bold">{item.card.info.name}</h1>
              <img src={CDN_URL + item.card.info.imageId} />
              <h3 className="text-2xl font-bold">
                Price: ₹{" "}
                {(item.card.info.price || item.card.info.defaultPrice) / 100}
              </h3>
            </div>
          );
        },
      )}
    </div>
  );
};
export default RestaurantMenu;

import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
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
  return (
    <div className="menu">
      <h1>Name of the Restaurant</h1>
      <h2>Menu</h2>
      <ul>
        <li>Biryani</li>
        <li>Burgers</li>
      </ul>
    </div>
  );
};
export default RestaurantMenu;

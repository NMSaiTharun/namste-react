import { CDN_URL } from "../utils/constants";
import { Link } from "react-router";
const RestaurantCard = (props) => {
  //console.log("The original object is {0}", props);
  const { name, cuisines, costForTwo, avgRatingString } = props.resData.info;
  const actualData = props.resData.info;
  //console.log(actualData);
  return (
    <div
      data-testid="resCard"
      className="h-full p-4 rounded-lg bg-gray-100 hover:bg-gray-200"
    >
      <Link to={"restaurants/" + actualData.id}>
        <img
          className="rounded-lg cursor-pointer w-full h-40 sm:h-48 object-cover"
          src={CDN_URL + actualData.cloudinaryImageId}
        ></img>
      </Link>

      <h3 className="font-bold py-2 sm:py-4 text-lg sm:text-2xl">{name}</h3>
      <h4 className="text-sm sm:text-lg md:text-xl">{cuisines.join(",")}</h4>
      <h4 className="text-sm sm:text-lg md:text-xl">{costForTwo}</h4>
      <h4 className="text-sm sm:text-lg md:text-xl">{avgRatingString} stars</h4>
      <h4 className="text-sm sm:text-lg md:text-xl">{actualData.sla.slaString}</h4>
    </div>
  );
};
// Higher Order Component
export const withPromotedLabel = (RestaurantCard) => {
  //console.log(RestaurantCard);
  return (props) => {
    //console.log(props);

    return (
      <div className="relative h-full">
        <label className="absolute top-2 left-2 bg-black text-white text-small font-bold px-2 py-1 rounded-lg z-10">
          Promoted
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;

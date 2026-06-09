import { CDN_URL } from "../utils/constants";
const RestaurantCard = (props) => {
  //console.log("The original object is {0}", props);
  const { name, cuisines, costForTwo, avgRatingString } = props.resData.info;
  const actualData = props.resData.info;
  //console.log(actualData);
  return (
    <div className="m-4 p-4 w-[500px] rounded-lg bg-gray-100 hover:bg-gray-200">
      <img
        className="rounded-lg"
        src={CDN_URL + actualData.cloudinaryImageId}
      ></img>
      <h3 className="font-bold py-4 text-2xl">{name}</h3>
      <h4 className="text-xl">{cuisines.join(",")}</h4>
      <h4 className="text-xl">{costForTwo}</h4>
      <h4 className="text-xl">{avgRatingString} stars</h4>
      <h4 className="text-xl">{actualData.sla.slaString}</h4>
    </div>
  );
};

export default RestaurantCard;

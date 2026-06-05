import { CDN_URL } from "../utils/constants";
const RestaurantCard = (props) => {
  //console.log("The original object is {0}", props);
  const { name, cuisines, costForTwo, avgRatingString } = props.resData.info;
  const actualData = props.resData.info;
  //console.log(actualData);
  return (
    <div className="res-card" style={{ backgroundColor: "#f0f0f0" }}>
      <img
        className="res-logo"
        src={CDN_URL + actualData.cloudinaryImageId}
      ></img>
      <h3>{name}</h3>
      <h4>{cuisines.join(",")}</h4>
      <h4>{costForTwo}</h4>
      <h4>{avgRatingString} stars</h4>
      <h4>{actualData.sla.slaString}</h4>
    </div>
  );
};

export default RestaurantCard;

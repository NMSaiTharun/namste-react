import React from "react";
import User from "./User";
import UserClass from "./UserClass";

export default class AboutClass extends React.Component {
  constructor(params) {
    super(params);
    //console.log("Parent Constructor is invoked");
  }
  componentDidMount() {
    //console.log("Parent componentDidMount is invoked");
  }
  render() {
    //console.log("Parent render is invoked");
    return (
      <div>
        <User name={"Sai Tharun"} location={"D"} />
        {/* <UserClass name={"Child 1"} location={"Location 1"} /> */}
        {/* <UserClass name={"Child 2"} location={"Location 2"} />
        <UserClass name={"Child 3"} location={"Location 3"} /> */}
      </div>
    );
  }
}
//export default AboutClass;

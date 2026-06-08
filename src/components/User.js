import { Contact } from "./Contact";
import { useEffect, useState } from "react";
const User = (tharun) => {
  const [count, setCount] = useState(1);
  const [count2] = useState(2);
  // useEffect(() => {
  //   const a = setInterval(function () {
  //     console.log("Testing");
  //   }, 1000);
  //   return () => {
  //     clearInterval(a);
  //   };
  // });

  return (
    <div className="user-card">
      <h1>Count from useState: {count}</h1>
      <button
        onClick={() => {
          setCount(4);
        }}
      >
        Change count
      </button>
      <h1>Count 2from useState: {count2}</h1>
      <h1>This is a React project for learning!</h1>
      <h2>Name: {tharun.name}</h2>
      <h3>Location:{tharun.location}</h3>
      <Contact />
    </div>
  );
};
export default User;

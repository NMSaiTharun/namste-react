import React from "react";
import ReactDOM from "react-dom/client";
const heading=React.createElement("h1",{id:"heading",xyz:"abc"},"Hello World from React!");
const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(heading);
console.log(heading); 
const parent=React.createElement("div"
,{id:"parent"},[
    React.createElement(
    "div",{"id":"child1",key:"child1"}
    ,[React.createElement("h1",{"id":"heading1",key:"h-1"},"Iam h1 tag"),React.createElement("h2",{id:"heading2",key:"h-2"},"Im h2 tag")]),
    React.createElement(
    "div",{id:"child2",key:"child2"}
    ,[React.createElement("h1",{id:"heading3",key:"h-1-3"},"Iam h1 tag"),React.createElement("h2",{id:"heading4",key:"h-1-4"},"Im h2 tag")])]
);
//const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);

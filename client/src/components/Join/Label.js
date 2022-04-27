import React from "react";

const Label = (props) => {
   let spanLists = props.children;
   spanLists = spanLists.split("").map((val, i) => {
      return <span key={Math.random()} style={{transitionDelay: `${i * 50}ms`}}>{val}</span>;
   });

   return (
      <label>{spanLists}</label>
   );
}

export default Label;

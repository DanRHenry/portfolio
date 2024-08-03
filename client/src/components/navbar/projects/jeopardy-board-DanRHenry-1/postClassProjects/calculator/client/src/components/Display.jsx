import React from "react";

export default function Display(props) {
  let displayScreen;
  props.inputArray.map((num) => {
    displayScreen += num
  });
  return(<div id='display'>
  {displayScreen}
</div>)
}

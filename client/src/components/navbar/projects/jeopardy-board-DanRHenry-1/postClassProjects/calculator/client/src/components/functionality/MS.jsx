import React from "react";
import { Button } from "reactstrap";
export default function MS(props) {
  return (
    <div>
      <Button
        onClick={() => {
          console.log(props.inputArray);
        }}
        className="btn"
      >
        MS
      </Button>
    </div>
  );
}

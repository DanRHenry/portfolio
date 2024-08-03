import React from "react";
import { Button } from "reactstrap";
export default function MR(props) {
  return (
    <div>
      <Button
        onClick={() => {
          console.log(props.inputArray);
        }}
        className="btn"
      >
        MR
      </Button>
    </div>
  );
}

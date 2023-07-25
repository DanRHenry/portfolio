import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";

export default function ProjectDisplay(props) {
console.log("props",props)
  let url = props.url;


  if (props.infoState === true) {
document.getElementById("projectInformation").style.display = "none";
  } else {
    // document.getElementById("projectInformation").style.display = "inherit";
  }

  return (
    <div>
      <div id="projectDisplay">
        <div id="projectInformation">
          <div id="projectInformationContent">
          {props.projectInformation}
          {/* {props.projectInformation.current} */}
          <br />
          <br />
          <Button onClick={props.infoStateToggle}>Close</Button>
          </div>
          </div>
      
        <iframe id="projectsiframe" title="display" src={url}></iframe>
      </div>
    </div>
  );
}

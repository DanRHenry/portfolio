import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";

export default function ProjectDisplay(props) {
// console.log("props",props)
  let url = props.url;


  if (props.infoState === true) {
document.getElementById("projectInformation").style.display = "none";
  } else {
    // document.getElementById("projectInformation").style.display = "inherit";
  }

  function toggleProjectInfo() {
    if (props.projectInfo) {
      // props.projectInfo.style.zIndex = "-1";
      props.projectInfo.style.visibility = "hidden";
      document.getElementById("btncontainer").style.visibility = "hidden";
    }
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
          </div>
          </div>
      
        <iframe id="projectsiframe" title="display" src={url}></iframe>
          <div id="btncontainer"><Button id="projectCloseButton" onClick={toggleProjectInfo}>Close</Button></div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import {Container, Row, Col} from "reactstrap";
import { Button } from "reactstrap";
import Headshot from "../../../media/Headshot.png"
import AboutMeContentFile from "./AboutMeContentFile";
export default function AboutMeDisplay(props) {
// console.log("props",props)
  let url = props.url;


  function toggleProjectInfo() {
    if (props.projectInfo) {
      // props.projectInfo.style.zIndex = "-1";
      props.projectInfo.style.visibility = "hidden";
      document.getElementById("btncontainer").style.visibility = "hidden";
    }
  }

  return (
    <>
      <div id="aboutMeDisplay">
        <div id="aboutMeContent"><AboutMeContentFile/>
        </div>
        
        <div id="headshotcontainer">
        <img id="headshotImg" src={Headshot} alt="Headshot" />
        </div>
      </div>
    </>
  );
}

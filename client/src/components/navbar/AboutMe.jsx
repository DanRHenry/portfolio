import React from "react";
import AboutMeDisplay from "./aboutMe/AboutMeDisplay";

export default function AboutMe(props) {
  return (
    <div id="aboutMeMenu">
      <AboutMeDisplay
        projectsMenuToggle={props.projectsMenuToggle}
        aboutMeMenuToggle={props.aboutMeMenuToggle}
      />
    </div>
  );
}

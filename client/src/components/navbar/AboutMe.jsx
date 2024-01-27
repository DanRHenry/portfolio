import React from "react";
import AboutMeDisplay from "./aboutMe/AboutMeDisplay";

export default function AboutMe(props) {
  return (
    <>
      <AboutMeDisplay
        projectsMenuToggle={props.projectsMenuToggle}
        aboutMeMenuToggle={props.aboutMeMenuToggle}
        aboutMeMenuState={props.aboutMeMenuState}
      />
    </>
  );
}

import React from "react";
import { Button, Container, Row, Col } from "reactstrap";
import Projects from "./Projects";
import { useState } from "react";
export default function Navigation() {
  const [projectsMenuState, toggleProjectsMenu] = useState(false);
  const [aboutMeMenuState, toggleAboutMeMenu] = useState(false);
  // const [contactMenuState, toggleContactMenu] = useState(false);

  //Todo Add functions to toggle the about me and contact menus

  const aboutMeMenuToggle = () => {
    // Close Other Open Menus (Projects, Contact)
    // Todo Add a close for the Project menu display
    if (projectsMenuState === true) {
      toggleProjectsMenu(false);
    }
    toggleAboutMeMenu(!aboutMeMenuState);
    const aboutMeDisplay = document.getElementById("aboutMeDisplay");
    if (aboutMeDisplay.style.width != "0") {
      aboutMeDisplay.style.width = "0";
      aboutMeDisplay.style.height = "0";
    }
  };

  const aboutMeMenu = document.getElementById("aboutMeMenu");
  // const aboutMeMenuItems = document.getElementById("aboutMeMenuItems");

  if (aboutMeMenuState === true) {
    console.log("aboutmetrue");
    // toggleContactMenu(false);
    aboutMeMenu.style.height = "83vh";
    aboutMeMenu.style.width = "80vw";
    setTimeout(() => {
      aboutMeMenu.style.visibility = "visible";
    }, 50);
  }

  if (aboutMeMenuState === false) {
    if (aboutMeMenu) {
      console.log("aboutmefalse");
      aboutMeMenu.style.height = "0";
      aboutMeMenu.style.width = "0";
      aboutMeMenu.style.visibility = "hidden";
    }
  }
  const projectsMenuToggle = () => {
    toggleProjectsMenu(!projectsMenuState);
    const projectDisplay = document.getElementById("projectDisplay");
    if (projectDisplay.style.width != "0") {
      projectDisplay.style.width = "0";
      projectDisplay.style.height = "0";
    }
  };

  const projectsMenu = document.getElementById("projectsMenu");
  const projectMenuItems = document.getElementById("projectsMenuItems");

  if (projectsMenuState === true) {
    // toggleAboutMeMenu(false);
    // toggleContactMenu(false);
    projectsMenu.style.height = "100vh";
    // projectsMenu.style.width = "fit-content";
    projectsMenu.style.width = "28.5em";
    setTimeout(() => {
      projectMenuItems.style.visibility = "visible";
    }, 50);
  }

  if (projectsMenuState === false) {
    if (projectsMenu) {
      projectsMenu.style.height = "0";
      projectsMenu.style.width = "0";
      projectMenuItems.style.visibility = "hidden";
    }
  }

  return (
    // <Container>
    <Row className="NavigationMenu">
      <h1 id="header">Welcome</h1>
      <div id="navbarbuttons">
        <Col id="projectsbtn" onClick={projectsMenuToggle}>
          Projects
        </Col>
        <Col id="aboutmebtn" onClick={aboutMeMenuToggle}>
          About Me
        </Col>
        <Col id="contactbtn" onClick={projectsMenuToggle}>
          Contact
        </Col>
      </div>
    </Row>
    // </Container>
  );
}

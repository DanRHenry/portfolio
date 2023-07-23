import React from "react";
import { Button, Container, Row, Col } from "reactstrap";
import Projects from "./Projects";
import { useState } from "react";
export default function Navigation() {
  const [projectsMenuState, toggleProjectsMenu] = useState(false);
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
      <Col id="aboutmebtn" onClick={projectsMenuToggle}>
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

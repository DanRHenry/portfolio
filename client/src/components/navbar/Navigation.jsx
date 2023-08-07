import React from "react";
import { Row, Col } from "reactstrap";
export default function Navigation(props) {

  function projectsBtnClick () {
    props.projectsMenuToggle(!props.projectsMenuState);
    props.aboutMeMenuToggle(false);
    props.contactMenuToggle(false)
  }

  function aboutMeBtnClick () {
    props.projectsMenuToggle(false)
    props.aboutMeMenuToggle(!props.aboutMeMenuState)
    props.contactMenuToggle(false)
  }

  function contactBtnClick () {
    props.projectsMenuToggle(false)
    props.aboutMeMenuToggle(false)
    props.contactMenuToggle(!props.contactMenuState)
  }
  return (
    // <Container>
    <Row className="NavigationMenu">
      <h1 id="header">Welcome</h1>
      <div id="navbarbuttons">
        <Col id="projectsbtn" onClick={projectsBtnClick}>
          Projects
        </Col>
        <Col id="aboutmebtn" onClick={aboutMeBtnClick}>
          About Me
        </Col>
        <Col id="contactbtn" onClick={contactBtnClick}>
          Contact
        </Col>
      </div>
    </Row>
    // </Container>
  );
}

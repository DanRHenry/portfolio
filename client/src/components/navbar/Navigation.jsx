import React from "react";
import { Row, Col } from "reactstrap";
export default function Navigation(props) {

  function projectsBtnClick () {
    props.aboutMeMenuToggle(false);
    props.projectsMenuToggle(!props.projectsMenuState);
  }

  function aboutMeBtnClick () {
    props.aboutMeMenuToggle(!props.aboutMeMenuState)
    props.projectsMenuToggle(false)
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
        <Col id="contactbtn" onClick={props.projectsMenuToggle}>
          Contact
        </Col>
      </div>
    </Row>
    // </Container>
  );
}

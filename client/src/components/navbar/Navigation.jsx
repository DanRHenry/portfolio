// import React from "react";
import { useEffect, React } from "react";
import { Row, Col } from "reactstrap";
import AboutMe from "./AboutMe";
import Projects from "./Projects";
import ContactDisplay from "./ContactDisplay";

export default function Navigation(props) {
  function projectsBtnClick() {
    props.projectsMenuToggle(!props.projectsMenuState);
    props.aboutMeMenuToggle(false);
    props.contactMenuToggle(false);
  }

  function aboutMeBtnClick() {
    props.projectsMenuToggle(false);
    props.aboutMeMenuToggle(!props.aboutMeMenuState);
    props.contactMenuToggle(false);
  }

  function contactBtnClick() {
    props.projectsMenuToggle(false);
    props.aboutMeMenuToggle(false);
    props.contactMenuToggle(!props.contactMenuState);
  }



  const contactDisplay = document.getElementById("contactDisplay");
  const contactContent = document.getElementById("contactContent");
  const projectsMenu = document.getElementById("projectsMenu");
  const projectsMenuItems = document.getElementById("projectsMenuItems");
  const aboutMeDisplay = document.getElementById("aboutMeDisplay");
  const aboutMeContent = document.getElementById("aboutMeContent");

  //! Projects Menu Use Effect
  useEffect(() => {
    if (props.projectsMenuState === true) {
      projectsMenu.className = "openProjectsMenu"

      setTimeout(() => {
        if (projectsMenuItems != null) {
          projectsMenuItems.className = "openProjectMenuItems";
        }
      }, 50);
    }
  
    if (props.projectsMenuState === false) {
      if (projectsMenu) {
        projectsMenu.className = "closedProjectsMenu"
        if (projectsMenuItems != null)
        projectsMenuItems.className = "closedProjectsMenuItems"
      }
    }
  })


  //! About Me Use Effect
  useEffect(() => {
    if (props.aboutMeMenuState === true) {
      aboutMeDisplay.className = "openAboutMeDisplay"
      aboutMeContent.className = "openAboutMeContent"
    }
  
    if (props.aboutMeMenuState === false) {
      if (aboutMeDisplay != null) {
        aboutMeDisplay.className = "closedAboutMeDisplay";
        aboutMeContent.className = "closedAboutMeContent";
        
      }
    }
  })


  // if (contactMenuState === true) {
  //   if (contactDisplay) {
  //     contactDisplay.className = "openContactDisplay"
  //     setTimeout(() => {
  //   contactContent.className = "openContactContent"
  //     })
  //   }
  // }

  // if (contactMenuState === false) {
  //   if (projectsMenu) {
  //     projectsMenu.style.height = "0";
  //     projectsMenu.style.width = "0";
  //     projectMenuItems.style.visibility = "hidden";
  //   }
  //   if (contactContent) {
  //     contactContent.style.height = "0";
  //     contactContent.style.width = "0";
  //     contactContent.style.visibility = "hidden";
  //   }
  // }


  useEffect(() => {
    if (props.contactMenuState === false) {
      if (contactDisplay != null) {
        contactDisplay.className = "closedContactDisplay";
        contactContent.className = "closedContactContent";
      }
    } else {
      contactDisplay.className = "openContactDisplay";
      contactContent.className = "openContactContent";
    }
  });


  return (
    // <Container>
    <>
      <Row className="NavigationMenu">
        <h1 id="header">Welcome</h1>
        <div id="navbarbuttons">
          <Col id="projectsbtn" onClick={projectsBtnClick}>
            Projects
          </Col>
          <Col id="aboutmebtn" onClick={aboutMeBtnClick}>
            About Me
          </Col>
          <Col
            id="contactbtn"
            onClick={() => {
              contactBtnClick(contactBtnClick);
            }}
          >
            Contact
          </Col>
        </div>
      </Row>
      <Projects
        projectsMenuToggle={props.projectsMenuToggle}
        aboutMeMenuToggle={props.aboutMeMenuToggle}
      />
      <AboutMe
        projectsMenuToggle={props.projectsMenuToggle}
        aboutMeMenuToggle={props.aboutMeMenuToggle}
        aboutMeMenuState={props.aboutMeMenuState}
      />
      <ContactDisplay
        projectsMenuToggle={props.projectsMenuToggle}
        aboutMeMenuToggle={props.aboutMeMenuToggle}
      />
      <img
        className="CodingBackgroundImg"
        src={props.backgroundCoding}
        alt="Background"
      />
    </>
  );
}

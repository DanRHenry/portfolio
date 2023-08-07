import "./App.css";
import { useState } from "react";
import Navigation from "./components/navbar/Navigation";
import Projects from "./components/navbar/Projects";
import AboutMe from "./components/navbar/AboutMe";
import backgroundCoding from "./media/pankaj-patel-u2Ru4QBXA5Q-unsplash.jpg"
import ContactDisplay from "./components/navbar/ContactDisplay";

function App() {
  const [projectsMenuState, toggleProjectsMenu] = useState(false);
  const [aboutMeMenuState, toggleAboutMeMenu] = useState(false);
  const [contactMenuState, toggleContactMenu] = useState(false);

  const aboutMeMenuToggle = (state) => {
    toggleAboutMeMenu(state);
    const aboutMeDisplay = document.getElementById("aboutMeDisplay");
    if (aboutMeDisplay.style.width !== "0") {
      aboutMeDisplay.style.width = "0";
      aboutMeDisplay.style.height = "0";
    }
  };

  const aboutMeMenu = document.getElementById("aboutMeMenu");
  
  const projectsMenuToggle = (state) => {
    toggleProjectsMenu(state);
    const projectDisplay = document.getElementById("projectDisplay");
    if (projectDisplay.style.width !== "0") {
      projectDisplay.style.width = "0";
      projectDisplay.style.height = "0";
      document.getElementById("projectCloseButton").style.visibility = "hidden";
      document.getElementById("projectInformation").style.visibility = "hidden"
    }
  };

  const contactDisplay = document.getElementById("contactDisplay");
  const contactMenuToggle = (state) => {
    toggleContactMenu(state);
    if (contactDisplay) {
    if (contactDisplay.style.width !== "0") {
      contactDisplay.style.width = "0";
      contactDisplay.style.height = "0";
    }
  }
  };

  const projectsMenu = document.getElementById("projectsMenu");
  const projectMenuItems = document.getElementById("projectsMenuItems");
  const contactContent = document.getElementById("contactContent");

  if (projectsMenuState === true) {
    projectsMenu.style.height = "100vh";
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

  if (aboutMeMenuState === true) {
    aboutMeMenu.style.height = "83vh";
    aboutMeMenu.style.width = "80vw";
    setTimeout(() => {
      aboutMeMenu.style.visibility = "visible";
    }, 50);
  }

  if (aboutMeMenuState === false) {
    if (aboutMeMenu) {
      aboutMeMenu.style.height = "0";
      aboutMeMenu.style.width = "0";
      aboutMeMenu.style.visibility = "hidden";
    }
  }

  if (contactMenuState === true) {
    if (contactDisplay) {
    contactDisplay.style.height = "83vh";
    contactDisplay.style.width = "80vw";
    contactDisplay.style.minWidth = "16em";
    setTimeout(() => {
      contactContent.style.visibility = "visible";
      contactContent.style.width = "100%";
      contactContent.style.height = "100%";
    }, 50);
  }
  }

  if (contactMenuState === false) {
    if (projectsMenu) {
      projectsMenu.style.height = "0";
      projectsMenu.style.width = "0";
      projectMenuItems.style.visibility = "hidden";
    }
    if (contactContent) {
    contactContent.style.height = "0";
    contactContent.style.width = "0";
    contactContent.style.visibility = "hidden";
    }
  }

  return (
    <div className="App">
      <img className='CodingBackgroundImg' src= {backgroundCoding} alt="Background" />
      <Projects
        projectsMenuToggle={projectsMenuToggle}
        aboutMeMenuToggle={aboutMeMenuToggle}
      />
      <AboutMe
        projectsMenuToggle={projectsMenuToggle}
        aboutMeMenuToggle={aboutMeMenuToggle}
      />
      <ContactDisplay />
      <Navigation
        projectsMenuToggle={projectsMenuToggle}
        aboutMeMenuToggle={aboutMeMenuToggle}
        contactMenuToggle = {contactMenuToggle}
        projectsMenuState = {projectsMenuState}
        aboutMeMenuState = {aboutMeMenuState}
        contactMenuState = {contactMenuState}
      />
    </div>
  );
}

export default App;

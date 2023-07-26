import "./App.css";
import { useState } from "react";
import Navigation from "./components/navbar/Navigation";
import Projects from "./components/navbar/Projects";
import AboutMe from "./components/navbar/AboutMe";
import backgroundCoding from "./media/pankaj-patel-u2Ru4QBXA5Q-unsplash.jpg"

function App() {
  const [projectsMenuState, toggleProjectsMenu] = useState(false);
  const [aboutMeMenuState, toggleAboutMeMenu] = useState(false);
  // const [contactMenuState, toggleContactMenu] = useState(false);

  //Todo Add functions to toggle the about me and contact menus

  const aboutMeMenuToggle = (state) => {
    toggleAboutMeMenu(state);
    const aboutMeDisplay = document.getElementById("aboutMeDisplay");
    if (aboutMeDisplay.style.width !== "0") {
      aboutMeDisplay.style.width = "0";
      aboutMeDisplay.style.height = "0";
    }
  };

  const aboutMeMenu = document.getElementById("aboutMeMenu");

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
  const projectsMenuToggle = (state) => {
    toggleProjectsMenu(state);
    const projectDisplay = document.getElementById("projectDisplay");
    if (projectDisplay.style.width !== "0") {
      projectDisplay.style.width = "0";
      projectDisplay.style.height = "0";
      document.getElementById("projectCloseButton").style.visibility = "hidden";
    }
  };

  const projectsMenu = document.getElementById("projectsMenu");
  const projectMenuItems = document.getElementById("projectsMenuItems");

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
      <Navigation
        projectsMenuToggle={projectsMenuToggle}
        aboutMeMenuToggle={aboutMeMenuToggle}
        projectsMenuState = {projectsMenuState}
        aboutMeMenuState = {aboutMeMenuState}
      />
    </div>
  );
}

export default App;

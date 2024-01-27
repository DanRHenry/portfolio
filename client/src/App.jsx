import "./App.css";
import { useState } from "react";
import Navigation from "./components/navbar/Navigation";
import backgroundCoding from "./media/pankaj-patel-u2Ru4QBXA5Q-unsplash.jpg";
// import { Routes, Route } from "react-router-dom";

function App() {
  const [projectsMenuState, toggleProjectsMenu] = useState(false);
  const [aboutMeMenuState, toggleAboutMeMenu] = useState(false);
  const [contactMenuState, toggleContactMenu] = useState(false);

  const aboutMeMenuToggle = (state) => {
    toggleAboutMeMenu(state);
    const aboutMeDisplay = document.getElementById("aboutMeDisplay");
    if (aboutMeDisplay.style.width !== "0") {
      //Change Class Here
      document.getElementById("aboutMeDisplay").className = "closedAboutMeDisplay"
    } else {
      document.getElementById("aboutMeDisplay").className = "openAboutMeDisplay"
    }
  };

  // const aboutMeMenu = document.getElementById("aboutMeMenu");

  const projectsMenuToggle = (state) => {
    toggleProjectsMenu(state);
    const projectDisplay = document.getElementById("projectDisplay");
    if (projectDisplay.style.width !== "0") {
      projectDisplay.style.width = "0";
      projectDisplay.style.height = "0";
      document.getElementById("projectCloseButton").style.visibility = "hidden";
      document.getElementById("projectInformation").style.visibility = "hidden";
      document.getElementById("fullScreenProjectButton").style.visibility =
        "hidden";
    }
  };

  // console.log("contact Display:",contactDisplay);
  // const contactMenuToggle = (state) => {
    
  // };



  return (
    <div className="App">
      <Navigation
        backgroundCoding = {backgroundCoding}
        projectsMenuToggle={projectsMenuToggle}
        aboutMeMenuToggle={aboutMeMenuToggle}
        contactMenuToggle={toggleContactMenu}
        projectsMenuState={projectsMenuState}
        aboutMeMenuState={aboutMeMenuState}
        contactMenuState={contactMenuState}
      />
      {/* <Routes>
        <Route path="/jeopardy" element={<Jeopardy />}/>
        <Route path="/api_project"/>
        <Route path="/scrabble"/>
        <Route path="/text-adventure"/>
        <Route path="/zorkington-dom"/>
      </Routes> */}
    </div>
  );
}

export default App;

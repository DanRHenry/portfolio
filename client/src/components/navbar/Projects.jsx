import React from "react";
import ProjectDisplay from "./projects/ProjectDisplay";
import { useState, useEffect, useRef } from "react";
export default function Projects() {
  let url = useRef();
  let pageToDisplay = useRef();
  let heightVar;
  let widthVar;
  const [projectState, projectToggle] = useState();
  const [urlState, urlToggle] = useState();
  const [apiProjectMenuStatus, apiProjectMenuStatusToggle] = useState(false);
  const [fullStackMenuStatus, fullStackMenuStatusToggle] = useState(false);
const [learningFavoritesMenuStatus, learningFavoritesMenuStatusToggle] = useState(false);
  // Opens the project display panel
  const toggleDisplay = () => {
    const projectDisplay = document.getElementById("projectDisplay");
    if ((projectDisplay.style.width = "0")) {
      projectDisplay.style.height = heightVar;
      projectDisplay.style.width = widthVar;
    } else {
      projectDisplay.style.width = "0";
      projectState.style.height = "0";
    }
  };

  //   Use Effect to select the correct project to display
  useEffect(() => {
    if (projectState === "ZorkingtonDOM") {
      console.log("ZorkingtonDOM");
      url.current = urlState;
      pageToDisplay.current = projectState;
    } else if (projectState === "TextAdventure") {
      console.log("TextAdventure");
      url.current = urlState;
      pageToDisplay.current = projectState;
    } else if (projectState === "Scrabble") {
      console.log("Scrabble");
      url.current = urlState;
      pageToDisplay.current = projectState;
    } else if (projectState === "APIProject") {
      console.log("API Project");
      url.current = urlState;
      pageToDisplay.current = projectState;
    } else if (projectState === "NewJeopardy") {
      console.log("NewJeopardy");
      url.current = urlState;
      pageToDisplay.current = projectState;
    } else if (projectState === "Jeopardy") {
      console.log("Jeopardy");
      url.current = urlState;
      pageToDisplay.current = projectState;
    } else if (projectState === "Capstone") {
      console.log("Capstone");
      url.current = urlState;
      pageToDisplay.current = projectState;
    }
  });

  // Use effect to toggle the Full Stack Menu sub items
  useEffect(() => {
    if (fullStackMenuStatus === false) {
      document.getElementById("fullStackMenuItems").style.display = "none";
    } else {
      document.getElementById("fullStackMenuItems").style.display = "inherit";
    }
  });

  // Use effect to toggle the API project menu sub items
  useEffect(() => {
    if (apiProjectMenuStatus === false) {
      document.getElementById("apiProjectsMenuText").style.display = "none";
    } else {
      document.getElementById("apiProjectsMenuText").style.display = "inherit";
    }
  });

//   Use effect to toggle the Learning Favorites menu sub items
  useEffect(() => {
    if (learningFavoritesMenuStatus === false) {
    //   document.getElementsByClassName("personalLearningFavorites").style.display = "none";
    document.getElementById("scrabble").style.display = "none";
    document.getElementById("newjeopardy").style.display = "none";
    document.getElementById("textadventure").style.display = "none";
    document.getElementById("zorkingtondom").style.display = "none";
    } else {
    //   document.getElementsByClassName("personalLearningFavorites").style.display = "inherit";
    document.getElementById("scrabble").style.display = "inherit";
    document.getElementById("newjeopardy").style.display = "inherit";
    document.getElementById("textadventure").style.display = "inherit";
    document.getElementById("zorkingtondom").style.display = "inherit";
    }
  });

  // Takes in the name of the project and updates the useState, then toggles the display
  const toggleProject = (name) => {
    projectToggle(name);
    toggleDisplay();
  };

  function toggleFullStackMenuContent() {
    fullStackMenuStatusToggle(!fullStackMenuStatus);
  }

  function toggleAPIMenuContent() {
    apiProjectMenuStatusToggle(!apiProjectMenuStatus);
  }

  function toggleLearningFavoritesMenuContent() {
    learningFavoritesMenuStatusToggle(!learningFavoritesMenuStatus)
  }
  return (
    <div id="projectsMenu">
      <div id="projectsMenuItems">
        {/* ---------------------------------------- API Fetching ---------------------------------------------- */}
        <div onClick={toggleAPIMenuContent} className="projectsMenuText">
          Fetching from APIs
        </div>
        {/*--------------------------------------------- Movie Night ------------------------------------------- */}
        <div
          id="apiProjectsMenuText"
          className="projectsMenuSecondaryText"
          onClick={() => {
            heightVar = "78vh";
            widthVar = "80vw";
            toggleProject("APIProject");
            urlToggle(
              "http://danhenrydev.com/iFrames/API%20Project/index.html"
            );
          }}
        >
          Movie Suggestions
        </div>

        {/* <div id="fullStackMenu"> */}
        {/* --------------------------------------------- Capstone ----------------------------------------------*/}
        <div
          onClick={toggleFullStackMenuContent}
          className="projectsMenuText"
          id="fullStack"
        >
          Full Stack
        </div>
        <div
          id="fullStackMenuItems"
          className="projectsMenuSecondaryText"
          onClick={() => {
            heightVar = "78vh";
            widthVar = "80vw";
            toggleProject("Capstone");
            urlToggle("https://www.youtube.com/embed/QGYtbh6PuIc");
          }}
        >
          Dollar Divider
        </div>
        {/* --------------------------------- Personal Learning Favorites -------------------------------------- */}
        <div className="projectsMenuText"
        onClick={toggleLearningFavoritesMenuContent}
        >
          Learning Favorites
          </div>
          {/* --------------------------------------------- Scrabble --------------------------------------------- */}
          <div
            className="projectsMenuSecondaryText"
            id="scrabble"
            onClick={() => {
              heightVar = "78vh";
              widthVar = "80vw";
              toggleProject("Scrabble");
              urlToggle("http://danhenrydev.com/iFrames/Scrabble/index.html");
            }}
          >
            Scrabble
          </div>
          <div
            className="projectsMenuSecondaryText"
            id="newjeopardy"
            onClick={() => {
              heightVar = "78vh";
              widthVar = "80vw";
              toggleProject("NewJeopardy");
              urlToggle(
                "http://danhenrydev.com/iFrames/jeopardy-board-DanRHenry-1/index.html"
              );
            }}
          >
            New Jeopardy
          </div>
          {/*------------------------------------------- Text Adventure -------------------------------------------*/}
          <div
            className="projectsMenuSecondaryText"
            id="textadventure"
            onClick={() => {
              heightVar = "78vh";
              widthVar = "80vw";
              toggleProject("TextAdventure");
              urlToggle(
                "http://danhenrydev.com/iFrames/text-adventure/index.html"
              );
            }}
          >
            Text Adventure
          </div>
          {/* ------------------------------------------- Zorkington DOM ------------------------------------------*/}
          <div
            className="projectsMenuSecondaryText"
            id="zorkingtondom"
            onClick={() => {
              heightVar = "78vh";
              // widthVar = "31.5vw"
              widthVar = "80vw";
              toggleProject("ZorkingtonDOM");
              urlToggle(
                "http://danhenrydev.com/iFrames/Zorkington-DOM/index.html"
              );
            }}
          >
            ZorkingtonDOM
          </div>
        <ProjectDisplay pageToDisplay={pageToDisplay} url={urlState} />
      </div>
    </div>
  );
}

import React from "react";
import ProjectDisplay from "./projects/ProjectDisplay";
import { useState, useEffect, useRef } from "react";
// import ProjectInformation from "./projects/ProjectInformation";
export default function Projects() {
  let heightVar;
  let widthVar;
  let pageToDisplay = useRef();
  let projectInformation = useRef();
  let url = useRef();
  const [projectState, projectToggle] = useState();
  const [projectInformationState, projectInformationToggle] = useState();
  const [urlState, urlToggle] = useState();
  const [apiProjectMenuStatus, apiProjectMenuStatusToggle] = useState(false);
  const [fullStackMenuStatus, fullStackMenuStatusToggle] = useState(false);
  const [learningFavoritesMenuStatus, learningFavoritesMenuStatusToggle] =
    useState(false);
  // Opens the project display panel
  const toggleDisplay = () => {
    const projectDisplay = document.getElementById("projectDisplay");
    projectDisplay.style.height = heightVar;
    projectDisplay.style.width = widthVar;
    document.getElementById("projectCloseButton").style.visibility = "visible";
    document.getElementById("fullScreenProjectButton").style.visibility = "visible";
  };

  let projectInfo = document.getElementById("projectInformation");
  //   Use Effect to select the correct project to display
  useEffect(() => {
    if (projectState === "ZorkingtonDOM") {
      url.current = urlState;
      pageToDisplay.current = projectState;
      projectInformation.current = zorkingtonInfo;
    } else if (projectState === "TextAdventure") {
      url.current = urlState;
      pageToDisplay.current = projectState;
      projectInformation.current = textAdventureInfo;
    } else if (projectState === "Scrabble") {
      url.current = urlState;
      pageToDisplay.current = projectState;
      projectInformation.current = scrabbleInfo;
    } else if (projectState === "APIProject") {
      url.current = urlState;
      pageToDisplay.current = projectState;
      projectInformation.current = apiProjectInfo;
    } else if (projectState === "NewJeopardy") {
      url.current = urlState;
      pageToDisplay.current = projectState;
      projectInformation.current = newJeopardyInfo;
    } else if (projectState === "Jeopardy") {
      url.current = urlState;
      pageToDisplay.current = projectState;
      projectInformation.current = jeopardyInfo;
    } else if (projectState === "Capstone") {
      url.current = urlState;
      pageToDisplay.current = projectState;
      projectInformation.current = capstoneInfo;
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
      document.getElementById("scrabble").style.display = "none";
      document.getElementById("newjeopardy").style.display = "none";
      document.getElementById("textadventure").style.display = "none";
      document.getElementById("zorkingtondom").style.display = "none";
    } else {
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
    if (projectInfo) {
      projectInfo.style.visibility = "visible";
      document.getElementById("btncontainer").style.visibility = "visible";
    }
    document.getElementById("projectInformation").style.display = "inherit";
  };

  // //! Toggle the project description
  const toggleProjectInformation = (info) => {
    projectInformationToggle(info);
  };

  function toggleFullStackMenuContent() {
    fullStackMenuStatusToggle(!fullStackMenuStatus);
  }

  function toggleAPIMenuContent() {
    apiProjectMenuStatusToggle(!apiProjectMenuStatus);
  }

  function toggleLearningFavoritesMenuContent() {
    learningFavoritesMenuStatusToggle(!learningFavoritesMenuStatus);
  }

  const zorkingtonInfo = `The text adventure project was heavily elaborated on, and converted to the console. This is that version, brought back to the DOM to allow for an interactive experience for this portfolio.`;

  const textAdventureInfo = `This project was coded from an idea: how to create a virtual environment where a character could move in the four cardinal directions, and view unique descriptions based on their location. Ideas were later used to develop the ZorkingtonDOM project.`;

  const scrabbleInfo = `The main goal of this project was to review HTML and CSS after spending time learning JavaScript. Functionality hasn't been developed yet.`;

  const apiProjectInfo = `This project aims to solve the problem of decision paralysis when picking a movie to watch. It makes use of the movie database to create a short list of movies for a user to choose from.`;

  const newJeopardyInfo = `The goal of this project was to begin to implement JavaScript, HTML, and CSS to recreate a Jeopardy game. I focused on creating a clean interface and to begin to develop functionality.`;

  const jeopardyInfo = ``;
  const capstoneInfo = `When my dev team met with our client, she requested a family budgeting app that could help manage shared household living expenses. It makes use of the MERN stack to provide a clean, interface with cross functionality between budget items, budget categories, transactions, and account balances for personal and household living expenses.`;

  return (
    <div id="projectsMenu" className="closedProjectsMenu">
      <div id="projectsMenuItems" className="closedProjectsMenuItems">
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
            toggleProjectInformation(apiProjectInfo);
            document.getElementById("btncontainer").style.visibility =
              "inherit";
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
            heightVar = "80vh";
            widthVar = "80vw";
            toggleProject("Capstone");
            toggleProjectInformation(capstoneInfo);
            document.getElementById("btncontainer").style.visibility =
              "inherit";
            urlToggle("https://www.youtube.com/embed/QGYtbh6PuIc");
          }}
        >
          Dollar Divider
        </div>
        {/* --------------------------------- Personal Learning Favorites -------------------------------------- */}
        <div
          className="projectsMenuText"
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
            // toggleDisplayInformation(document.getElementById("projectInformation").style.visibility = "inherit");
            document.getElementById("btncontainer").style.visibility =
              "inherit";
            toggleProjectInformation(scrabbleInfo);
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
            toggleProjectInformation(newJeopardyInfo);
            document.getElementById("btncontainer").style.visibility =
              "inherit";
            urlToggle(
              "http://danhenrydev.com/iFrames/jeopardy-board-DanRHenry-1/index.html"
            );
          }}
        >
          Jeopardy
        </div>
        {/*------------------------------------------- Text Adventure -------------------------------------------*/}
        <div
          className="projectsMenuSecondaryText"
          id="textadventure"
          onClick={() => {
            heightVar = "78vh";
            widthVar = "80vw";
            toggleProject("TextAdventure");
            toggleProjectInformation(textAdventureInfo);
            document.getElementById("btncontainer").style.visibility =
              "inherit";
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
            widthVar = "80vw";
            toggleProject("ZorkingtonDOM");
            toggleProjectInformation(zorkingtonInfo);
            document.getElementById("btncontainer").style.visibility =
              "inherit";
            urlToggle(
              "http://danhenrydev.com/iFrames/Zorkington-DOM/index.html"
            );
          }}
        >
          ZorkingtonDOM
        </div>
      </div>
      <ProjectDisplay
        pageToDisplay={pageToDisplay}
        url={urlState}
        projectInformation={projectInformationState}
        projectInfo={projectInfo}
      />
    </div>
  );
}

import React from 'react'
import ProjectDisplay from './projects/ProjectDisplay'
import { useState, useEffect, useRef } from 'react'
export default function Projects() {
    let url = useRef();
    let pageToDisplay = useRef();
    const [projectState, projectToggle] = useState();
    const [urlState, urlToggle] = useState();
    const toggleDisplay = () => {
        const projectDisplay = document.getElementById("projectDisplay")
        if (projectDisplay.style.width = "0") {
        projectDisplay.style.height= "80vh";
        projectDisplay.style.width= "90vw";
    } else {
        projectDisplay.style.width = "0";
        projectState.style.height = "0";
    }
    }

    useEffect(() => {
        if (projectState === "ZorkingtonDOM") {
            console.log("ZorkingtonDOM")
            url.current = urlState;
            pageToDisplay.current = projectState;
        } else if (projectState === "TextAdventure") {
            console.log("TextAdventure")
            url.current = urlState;
            pageToDisplay.current = projectState;
        } else if (projectState === "Scrabble") {
            console.log("Scrabble")
            url.current = urlState;
            pageToDisplay.current = projectState;
        } else if (projectState === "APIProject") {
            console.log("API Project")
            url.current = urlState;
            pageToDisplay.current = projectState;
        } else if (projectState === "NewJeopardy") {
            console.log("NewJeopardy") 
            url.current = urlState;
            pageToDisplay.current = projectState;
        } else if (projectState === "Jeopardy") {
            console.log("Jeopardy")
            url.current = urlState;
            pageToDisplay.current = projectState;
        } else if (projectState === "Capstone") {
            console.log("Capstone")
            url.current = urlState;
            pageToDisplay.current = projectState;
        }
    })

    const toggleProject = ((name) => {
        projectToggle(name)
        toggleDisplay()
    })
  return (
    <div id='projectsMenu'>
        <div id='projectsMenuItems'>
            <div className='projectsMenuText' onClick={() => {
                toggleProject("Jeopardy")
                urlToggle("http://danhenrydev.com/iFrames/jeopardy-board-DanRHenry/index.html")
            }}>Jeopardy</div>
            <div className='projectsMenuText' onClick={() => {
                toggleProject("NewJeopardy")
                urlToggle("http://danhenrydev.com/iFrames/jeopardy-board-DanRHenry-1/index.html")
            }}>New Jeopardy</div>
            <div className='projectsMenuText' onClick={() => {
                toggleProject("APIProject")
                urlToggle("http://danhenrydev.com/iFrames/API%20Project/index.html")
            }}>API Project</div>
            <div className='projectsMenuText' onClick={() => {
                toggleProject("Scrabble")
                urlToggle("http://danhenrydev.com/iFrames/Scrabble/index.html")
            }}>Scrabble</div>
            <div className='projectsMenuText' onClick={() => {
                toggleProject("TextAdventure")
                urlToggle("http://danhenrydev.com/iFrames/text-adventure/index.html")
            }}>Text Adventure</div>
            <div className='projectsMenuText' onClick={() => {
                toggleProject("ZorkingtonDOM")
                urlToggle("http://danhenrydev.com/iFrames/Zorkington-DOM/index.html")
            }}>ZorkingtonDOM</div>
            <div className='projectsMenuText' onClick={() => {
                toggleProject("Capstone")
                urlToggle("https://www.youtube.com/embed/QGYtbh6PuIc")
                // urlToggle("http://danhenrydev.com/iFrames/capstone/index.html")
            }}>Capstone</div>
            <ProjectDisplay
            pageToDisplay = {pageToDisplay}
            url = {urlState}
            />
        </div>
    </div>
  )
}
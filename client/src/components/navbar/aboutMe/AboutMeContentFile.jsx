import React, { useEffect, useState } from 'react'

export default function AboutMeContentFile(props) {
    const [pastCareerSetting, togglePastCareerSetting] = useState(false);
    const [journeySetting, toggleJourneySetting] = useState(false);
    const [futurePlansSetting, toggleFuturePlansSetting] = useState(false);

    useEffect(() => {
        let pastCareerContent = document.getElementById("pastCareerContent")
        if (pastCareerSetting === false || props.aboutMeMenuState === false) {
            pastCareerContent.style.display = "none";
            // document.getElementById("aboutMeMenu").style.height = "55em";
        } else {
            pastCareerContent.style.display = "initial";
            if (props.aboutMeMenuState === false) {

            }
            // document.getElementById("aboutMeMenu").style.height = "initial";
        };
    });

    useEffect(() => {
        let journeyContent = document.getElementById("journeyContent")
        if (journeySetting === false || props.aboutMeMenuState === false) {
            journeyContent.style.display = "none";
            // document.getElementById("aboutMeMenu").style.height = "55em";
        } else {
            journeyContent.style.display = "initial"
            // document.getElementById("aboutMeMenu").style.height = "initial";
        };
    });

    useEffect(() => {
        let futurePlansContent = document.getElementById("futurePlansContent")
        if (futurePlansSetting === false || props.aboutMeMenuState === false) {
            futurePlansContent.style.display = "none";
            // document.getElementById("aboutMeMenu").style.height = "initial"
        } else {
            futurePlansContent.style.display = "initial"
            // document.getElementById("aboutMeMenu").style.height = "55em";
        };
    });

    const pastCareerToggle = () => {
        togglePastCareerSetting(!pastCareerSetting);
        toggleJourneySetting(false);
        toggleFuturePlansSetting(false);
    }
    const journeyToggle = () => {
        toggleJourneySetting(!journeySetting);
        togglePastCareerSetting(false);
        toggleFuturePlansSetting(false);
    }

    const futurePlansToggle = () => {
        toggleFuturePlansSetting(!futurePlansSetting);
        toggleJourneySetting(false);
        togglePastCareerSetting(false);
    }
  return (
    // <div id='aboutMeContentDiv'>
<div>
    <div id='aboutMeHeading'>
    Thank you for visiting my site. <br />
    </div>
    <div>
    <div className='bioHeader' onClick={pastCareerToggle} id='togglePastCareer'><ul><li>My Present Career</li></ul></div>

    <div className='bioContent' id='pastCareerContent'>I have spent over 15 years as a high school music teacher in Western Massachusetts. I've always had a strong affinity for both music and technology, and the problem solving that goes with both teaching, and learning to work in code.</div>

    <div className='bioHeader' onClick={journeyToggle} id='toggleJourney'><ul><li>My Coding Journey</li></ul></div>

    <div className='bioContent' id='journeyContent'>With a solid background in IT, I began learning to code in October 2022, beginning with HTML, CSS, and JavaScript, and moving on to develop full-stack web applications working with the MERN stack.
    </div>

    <div className='bioHeader' onClick={futurePlansToggle} id='toggleFuturePlans'><ul><li>My Future Plans</li></ul></div>
    
    <div className='bioContent' id='futurePlansContent'>I am very much looking forward to continuing to find enjoyment and fulfillment through coding, working on exciting new projects, reviewing old projects, and refining my skills along the way.</div>
    </div>
    </div>
    // </div>
  )
}

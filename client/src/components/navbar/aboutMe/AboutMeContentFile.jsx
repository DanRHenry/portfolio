import React, { useEffect, useState } from 'react'

export default function AboutMeContentFile() {
    const [pastCareerSetting, togglePastCareerSetting] = useState(false);
    const [journeySetting, toggleJourneySetting] = useState(false);
    const [futurePlansSetting, toggleFuturePlansSetting] = useState(false);

    useEffect(() => {
        let pastCareerContent = document.getElementById("pastCareerContent")
        if (pastCareerSetting === false) {
            pastCareerContent.style.display = "none";
        } else {
            pastCareerContent.style.display = "initial";
        };
    });

    useEffect(() => {
        let journeyContent = document.getElementById("journeyContent")
        if (journeySetting === false) {
            journeyContent.style.display = "none";
        } else {
            journeyContent.style.display = "initial"
        };
    });

    useEffect(() => {
        let futurePlansContent = document.getElementById("futurePlansContent")
        if (futurePlansSetting === false) {
            futurePlansContent.style.display = "none";
        } else {
            futurePlansContent.style.display = "initial"
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
    <div>
    Thank you for visiting my site. <br />
    <div>
    <div className='bioHeader' onClick={pastCareerToggle} id='togglePastCareer'><ul><li>My Past Career</li></ul></div>
    <div className='bioContent' id='pastCareerContent'>In my previous career, I taught high school music.</div>
    <div className='bioHeader' onClick={journeyToggle} id='toggleJourney'><ul><li>My Coding Journey</li></ul></div>
    <div className='bioContent' id='journeyContent'>I began to learn how to code in October, 2022, beginning with HTML, CSS, and JavaScript. In the Spring of 2023, I enrolled in a coding boot camp to learn how to develop a full-stack web app using the MERN stack.
    </div>
    <div className='bioHeader' onClick={futurePlansToggle} id='toggleFuturePlans'><ul><li>My Future Plans</li></ul></div>
    <div className='bioContent' id='futurePlansContent'>I am very much looking forward to continuing to learn and develop my coding skills throughout my new career. I have enjoyed all aspects of learning to code, and can see myself happy in a variety of coding roles.</div>
    </div>
    </div>
  )
}

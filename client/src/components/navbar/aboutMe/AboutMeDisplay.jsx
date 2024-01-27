import Headshot from "../../../media/Headshot.png";
import AboutMeContentFile from "./AboutMeContentFile";
export default function AboutMeDisplay(props) {
  return (
    <>
      <div id="aboutMeDisplay" className="closedAboutMeDisplay">
        <div id="aboutMeContent" className="closedAboutMeContent">
          <AboutMeContentFile 
          aboutMeMenuState={props.aboutMeMenuState}
          />
        </div>

        <div id="headshotcontainer">
          <img id="headshotImg" src={Headshot} alt="Headshot" />
        </div>
      </div>
    </>
  );
}

import Headshot from "../../../media/Headshot.png"
import AboutMeContentFile from "./AboutMeContentFile";
export default function AboutMeDisplay() {

  return (
    <>
      <div id="aboutMeDisplay">
        <div id="aboutMeContent"><AboutMeContentFile/>
        </div>
        
        <div id="headshotcontainer">
        <img id="headshotImg" src={Headshot} alt="Headshot" />
        </div>
      </div>
    </>
  );
}

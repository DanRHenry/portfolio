import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

export default function ProjectDisplay(props) {
  // const navigate = useNavigate();
  let url = props.url;

  function closeProjectInfo() {
    // if (props.projectInfo) {
      props.projectInfo.style.visibility = "hidden";
      document.getElementById("projectCloseButton").style.visibility = "hidden";
      document.getElementById("fullScreenProjectButton").style.visibility = "hidden";
    // }
  }

  function openProjectInFullScreen() {
    window.location.href=url;
    console.log(url)
    // return (
      // navigate(url)
      // )
  }
  return (
    <div id="projectContainer">
      <div id="projectDisplay">
        <div id="projectInformation">
          <div id="projectInformationContent">
          {props.projectInformation}
          <br />
          <br />
          </div>
          </div>
      
        <iframe id="projectsiframe" title="display" src={url}></iframe>
          <div id="btncontainer"><Button id="projectCloseButton" onClick={closeProjectInfo}>Close</Button>
          <div id="fullScreenBtn"><Button id="fullScreenProjectButton" onClick={openProjectInFullScreen}>Full Screen</Button></div>
          </div>

      </div>
    </div>
  );
}

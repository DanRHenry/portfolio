import { Button } from "reactstrap";

export default function ProjectDisplay(props) {
  let url = props.url;

  function closeProjectInfo() {
    // if (props.projectInfo) {
      props.projectInfo.style.visibility = "hidden";
      document.getElementById("projectCloseButton").style.visibility = "hidden";
    // }
  }

  return (
    <div>
      <div id="projectDisplay">
        <div id="projectInformation">
          <div id="projectInformationContent">
          {props.projectInformation}
          <br />
          <br />
          </div>
          </div>
      
        <iframe id="projectsiframe" title="display" src={url}></iframe>
          <div id="btncontainer"><Button id="projectCloseButton" onClick={closeProjectInfo}>Close</Button></div>
      </div>
    </div>
  );
}

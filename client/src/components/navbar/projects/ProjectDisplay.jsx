import React, { useEffect } from "react";
export default function ProjectDisplay(props) {
    let url = props.url;

  return (
    <div id="projectDisplay">
    <iframe id="projectsiframe" title="display" src={url}></iframe>
    </div>
  );
}

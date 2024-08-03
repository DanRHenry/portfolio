//!https://surveyjs.io/form-library/examples/create-dropdown-menu-in-javascript/reactjs#
import { React, useRef } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import { baseurl } from "../../../helpers/url";
export default function DisplayCalories(props) {

const setCalorieEdit = () => {
  props.setCalorieEditCheck(props.caloriesID);
}

  return (
    <>
    <td>DisplayCalories</td>
            <td className="tableItems tableCalories" id={props.caloriesID} onClick={setCalorieEdit}>{props.calories}</td>
    </>
  );
}

//!https://surveyjs.io/form-library/examples/create-dropdown-menu-in-javascript/reactjs#
import { React, useRef } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import { baseurl } from "../../../helpers/url";
export default function DisplayCalorie(props) {

const setCalorieEdit = () => {
  props.setCalorieEditCheck(props.caloriesID);
}

  return (
    <>
    <td>DisplayCalorie</td>
            {/* <tr className="tableItems tableContainer" key={props.foodData.indexOf(props.item)}> */}
            <td className="tableItems tableCalories" id={props.caloriesID} onClick={setCalorieEdit}>{props.calories}</td>
            {/* <td calendar>{calories}</td> */}
            <td className="tableItems tableTotalCalories">{props.totalCalories}</td>
          {/* </tr> */}
    </>
  );
}

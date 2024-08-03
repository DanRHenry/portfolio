//!https://surveyjs.io/form-library/examples/create-dropdown-menu-in-javascript/reactjs#
import { React, useRef } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import { baseurl } from "../../../helpers/url";
export default function DisplayFoodItem(props) {
  console.log("props:",props)
const setFoodEdit = () => {
  console.log("props:",props)
  props.setFoodEditCheck(props.foodID);
}

  return (
    <>
    <td>DisplayFoodItem</td>
            <td className="tableItems tableItemUnit" id={props.foodID} onClick={setFoodEdit}>{props.food}</td>
    </>
  );
}

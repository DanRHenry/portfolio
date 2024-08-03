//!https://surveyjs.io/form-library/examples/create-dropdown-menu-in-javascript/reactjs#
import { React, useRef } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import { baseurl } from "../../../helpers/url";
export default function DisplayQuantity(props) {
// const setFoodEdit = () => {
//   props.setFoodItemEditCheck(props.foodID);
// }
const setQuantityEdit = () => {
  props.setQuantityEditCheck(props.quantityID);
}
  return (
    <>
    <td>DisplayQuantity</td>
            <td className="tableItems tableItemQuantity" id={props.quantityID} onClick={setQuantityEdit}>{props.quantity}</td>

    </>
  );
}

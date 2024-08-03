//!https://surveyjs.io/form-library/examples/create-dropdown-menu-in-javascript/reactjs#
import { React, useRef } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import { baseurl } from "../../helpers/url";
export default function AddFoodItem(props) {
  // const creatorNameRef = "";
  const foodNameRef = useRef();
  // const mealCategoryRef = useRef();
  const unitRef = useRef();
  const quantityRef = useRef();
  const caloriesRef = useRef();
  // const mealTypeRef = useRef();
  // const [formInputFields, setFormInputFields] = useState();
  const userEmail = props.information.email;

  let day;

  if (props.day < 10) {
    day = `0${props.day.toString()}`;
  } else {
    day = props.day;
  }
  //  --------------------- POST ----------------
  async function handleSubmit(e) {
    if (foodNameRef.current.value !== "") {
      //* Stop the page from refreshing when the form submits
      e.preventDefault();

      //* Creating a variable that holds each input's ref value
      const creatorName = userEmail;

      const date = props.year.toString() + props.month.toString() + day;
      // const creatorName = creatorNameRef.current.value;

      const foodName = foodNameRef.current.value;
      const mealCategory = "mealCategoryRef.current.value"; //IE Breakfast, lunch, dinner, snack
      const unit = unitRef.current.value;
      const quantity = quantityRef.current.value;
      const calories = caloriesRef.current.value;
      const mealType = "mealTypeRef.current.value"; // ie: Protein, sugary snack, etc.

      // setFormInputFields(

      // )
      //* The server expects json, we need to build and json-ify a user object to send to our server
      let newFoodObj = JSON.stringify({
        creatorName,
        date,
        foodName,
        mealCategory,
        unit,
        quantity,
        calories,
        mealType,
      });

      const url = baseurl+"/food/storeFood";

      const headers = new Headers();

      headers.append("Content-Type", "application/json");

      const requestOptions = {
        headers,
        body: newFoodObj,
        method: "POST",
      };

      // Use try/catch for our async fetch
      try {
        // Build an async fetch, fetch will use the url and requestOptions obj
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        //   console.log("data:", data);

        // If the server send a success message we can proceed

        if (data.message === "Success! Food Saved!") {
          // props.setFoodData();
          props.getFoodInformation();
          newFoodObj = {};
          const form = document.querySelector("form")
          form.reset()

        }
      } catch (err) {
        console.error(err.message);
      }
    }
  }
  return (
    <div id="inputFormsAndButton">
      <Form onSubmit={handleSubmit}>
        <FormGroup className="inputFields">
          <Input
            name="Food"
            placeholder="Food"
            innerRef={foodNameRef}
            type="text"
            autoComplete="off"
          />
          <Input
            name="Amount"
            placeholder="Amount"
            innerRef={quantityRef}
            type="number"
            autoComplete="off"
          />
          <Input
            name="Unit"
            placeholder="Unit"
            innerRef={unitRef}
            type="text"
            autoComplete="off"
          />
          <Input
            name="Calories"
            placeholder="Calories"
            innerRef={caloriesRef}
            type="number"
            autoComplete="off"
          />
        </FormGroup>
      </Form>
      <Button id="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}

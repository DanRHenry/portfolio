//!https://surveyjs.io/form-library/examples/create-dropdown-menu-in-javascript/reactjs#
import { React, useRef } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import { baseurl } from "../../../helpers/url";

export default function EditFoodItem(props) {
  const foodNameRef = useRef();

  let day;

  if (props.day < 10) {
    day = `0${props.day.toString()}`;
  } else {
    day = props.day;
  }
  //  --------------------- PATCH ----------------
  async function handleSubmit(e) {
    if (foodNameRef.current.value !== "") {
      //* Stop the page from refreshing when the form submits
      e.preventDefault();
      const foodName = foodNameRef.current.value;
      //* The server expects json, we need to build and json-ify a user object to send to our server
      let newFoodObj = JSON.stringify({
        foodName,
      });

      const url = baseurl+"/food/edit";
      // const url = baseurl+"/food/storeFood";


      const headers = new Headers();

      headers.append("Content-Type", "application/json");

      const requestOptions = {
        headers,
        body: newFoodObj,
        method: "PATCH",
      };

      // Use try/catch for our async fetch
      try {
        // Build an async fetch, fetch will use the url and requestOptions obj
        const response = await fetch(url, requestOptions);
        const data = await response.json();

        // If the server send a success message we can proceed

        if (data.message === "Success! Food Saved!") {
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
        </FormGroup>
      </Form>
      <Button id="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}

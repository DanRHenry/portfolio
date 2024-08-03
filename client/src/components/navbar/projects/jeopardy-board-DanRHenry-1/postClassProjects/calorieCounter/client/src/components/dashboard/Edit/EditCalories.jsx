//!https://surveyjs.io/form-library/examples/create-dropdown-menu-in-javascript/reactjs#
import { React, useRef } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import { baseurl } from "../../../helpers/url";

export default function EditCalories(props) {

  const caloriesRef = useRef();

  //  --------------------- PATCH ----------------
  async function handleSubmit(e) {
    if (caloriesRef.current.value !== "") {
      //* Stop the page from refreshing when the form submits
      e.preventDefault();

      //* Creating a variable that holds each input's ref value
      const calories = caloriesRef.current.value;

      //* The server expects json, we need to build and json-ify a user object to send to our server
      let newFoodObj = JSON.stringify({
        calories,
      });

      const url = baseurl+"/food/edit";

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

import React from "react";
import { useRef } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../../helpers/url";
export default function GatherInfo(props) {
  const navigate = useNavigate();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const weightRef = useRef();
  // const heightRef = useRef();
  const feetRef = useRef();
  const inchesRef = useRef();
  const ageRef = useRef();
  const maintainRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const weight = weightRef.current.value;
    const feet = feetRef.current.value;
    const inches = inchesRef.current.value;
    const age = ageRef.current.value;
    const maintain = maintainRef.current.value;

    let userInfoObject = JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      weight: weight,
      feet: feet,
      inches: inches,
      age: age,
      maintain: maintain,
    });


    const url = baseurl+"/user/edit";
    const token = localStorage.getItem("token");
    // console.log("token:",token)
    const headers = new Headers({
      Authorization: token,
    });

    headers.append("Content-Type", "application/json");

    const requestOptions = {
      headers,
      body: userInfoObject,
      method: "PATCH",
    };

    // Use try/catch for our async fetch
    try {
      // Build an async fetch, fetch will use the url and requestOptions obj
      const response = await fetch(url, requestOptions);
      const data = await response.json();

      // If the server send a success message we can proceed
      if (data.message === "User profile updated!") {
        //* Navigate to the dashboard;
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            placeholder="First Name"
            innerRef={firstNameRef}
            autoComplete={"off"}
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Last Name"
            innerRef={lastNameRef}
            autoComplete={"off"}
          />
        </FormGroup>
        <FormGroup>
          <Input placeholder="Feet" innerRef={feetRef} autoComplete={"off"} />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Inches"
            innerRef={inchesRef}
            autoComplete={"off"}
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Weight"
            innerRef={weightRef}
            autoComplete={"off"}
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Maintain"
            innerRef={maintainRef}
            autoComplete={"off"}
          />
        </FormGroup>
        <FormGroup>
          <Input placeholder="Age" innerRef={ageRef} autoComplete={"off"} />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

import { useRef } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../../helpers/url";
export default function Register(props) {
  const updateToken = props.updateToken;
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    //* Stop the page from refreshing when the form submits
    e.preventDefault();

    //* Creating a variable that holds each input's ref value
    const firstName = "";
    const lastName = "";
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const feet = 0;
    const inches = 0;
    const weight = 0;
    const age = 0;
    //* The server expects json, we need to build and json-ify a user object to send to our server
    let signUpObj = JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      feet,
      inches,
      weight,
      age,
    });

    const url = baseurl+"/user/signup";

    const headers = new Headers();

    headers.append("Content-Type", "application/json");

    const requestOptions = {
      headers,
      body: signUpObj,
      method: "POST",
    };

    // Use try/catch for our async fetch
    try {
      // Build an async fetch, fetch will use the url and requestOptions obj
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log("data:",data)
      // If the server send a success message we can proceed
      if (data.message === "Success! User Created!") {
        updateToken(data.token);
        navigate("/GatherInfo");
      } else {
        // console.log("message: ",data.message)
        // console.log(data.message);
        // alert(data.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div id="register">
      <h2>Register</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            placeholder="Email address"
            innerRef={emailRef}
            type="email"
            autoComplete={"off"}
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Password"
            innerRef={passwordRef}
            type="password"
            autoComplete={"off"}
          />
        </FormGroup>
        <Button type="submit">Register</Button>
      </Form>
    </div>
  );
}

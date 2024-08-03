// Container is Reactstrap's resizing div w/ grid rows and columns
// https://getbootstrap.com/docs/5.3/layout/grid/ (change class to className in jsx)
import { Col, Container, Row, Button } from "reactstrap";
import { useState } from "react";
import Register from "./register/Register";
import Login from "./login/Login";
export default function Auth(props) {
  const [button, setButton] = useState("New user? Sign-up here!");

  function swapForm () {
    button === "Returning user? Login here!"
      ? setButton("New user? Sign-up here!")
      : setButton("Returning user? Login here!");
  }

  const displayForm = () => {
    return button === "Returning user? Login here!" ? (
      <Register updateToken={props.updateToken} />
    ) : (
      <Login updateToken={props.updateToken} />
    );
  };
  return (
    <>
      <div id="loginPage"></div>
      <Container>
        <Row>
          <Col md="6">
            <br />
            <Button id="loginBtn" onClick={swapForm} color="dark">
              {button}
            </Button>
            {displayForm()}
            <br />
            <br />
          </Col>
        </Row>
      </Container>
    </>
  );
}

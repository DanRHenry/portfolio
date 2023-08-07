import React, { useState } from "react";
import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";
import { useRef } from "react";

export default function ContactContent() {
  const address = useRef();
  const subject = useRef();
  const message = useRef();
  const [active, setActive] = useState(false);
  // const [formSubmission, setFormSubmission] = useState();
  // const submitBtn = document.getElementById("submitBtn");
  // submitBtn.color = "warning";

  const handleSubmit = (e) => {
    e.preventDefault();
    setActive(!active);
    console.log("Address:", address.current.value);
    console.log("Subject:", subject.current.value);
    console.log("Message:", message.current.value);
    address.current.value = "";
    subject.current.value = "";
    message.current.value = "";
    setTimeout(() => {
      setActive(false);
    }, 3000)
  };

  return (
    <div id="contactContent">
      {active ? <div id="sentMessage">Your message has been sent</div> : 
      
      <div>
      <div id="contactGreeting">Send Me a Message</div>
      <Form onSubmit={handleSubmit}>
        {/* Email Input */}
        <FormGroup className="column" row>
          <Label for="email" sm={2}>
            Email Address
          </Label>
          <Col sm={10}>
            <Input
              id="email"
              name="email"
              required
              placeholder="enter email address"
              innerRef={address}
              type="email"
            />
          </Col>
        </FormGroup>

        <FormGroup className="column" row>
          <Label for="subject" sm={2}>
            Subject
          </Label>
          <Col sm={10}>
            <Input
              id="subject"
              name="text"
              required
              placeholder="enter subject"
              innerRef={subject}
              type="textarea"
            />
          </Col>
        </FormGroup>

        <FormGroup className="column" row>
          <Label for="message" sm={2}>
            Message
          </Label>
          <Col sm={10}>
            <Input
              id="message"
              name="text"
              required
              placeholder="message body"
              innerRef={message}
              type="textarea"
            />
          </Col>
        </FormGroup>
{/* 
        <FormGroup check row>
          <Col
            sm={{
              offset: 2,
              size: 10,
            }}
          > */}
          <div id="submitBtnCnt">
            <Button color="success" id="submitBtn">Submit</Button>
            </div>
          {/* </Col>
        </FormGroup> */}
      </Form>
      </div>
      }
    </div>
  );
}

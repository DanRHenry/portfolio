import React from 'react'
import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";

export default function ContactContent() {
  return (
<div id="contactContent">
    <div id='contactGreeting'>
        Send Me a Message
    </div>
<Form>
  {/* Email Input */}
  <FormGroup row>
    <Label for="email" sm={2}>
      Email
    </Label>
    <Col sm={10}>
      <Input
        id="email"
        name="email"
        placeholder="with a placeholder"
        type="email"
      />
    </Col>
  </FormGroup>

  <FormGroup row>
    <Label for="subject" sm={2}>
      Subject
    </Label>
    <Col sm={10}>
      <Input id="subject" name="text" type="textarea" />
    </Col>
  </FormGroup>

  <FormGroup row>
    <Label for="message" sm={2}>
      Message
    </Label>
    <Col sm={10}>
      <Input id="message" name="text" type="textarea" />
    </Col>
  </FormGroup>

  <FormGroup check row>
    <Col
      sm={{
        offset: 2,
        size: 10,
      }}
    >
      <Button>Submit</Button>
    </Col>
  </FormGroup>
</Form>
</div>
  )
}

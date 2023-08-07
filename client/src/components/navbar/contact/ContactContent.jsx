import React, { useState } from "react";
import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";
import { useRef } from "react";
import key from "../../../helpers/apikey.js";
export default function ContactContent() {
  const name = useRef();
  const organization = useRef();
  const address = useRef();
  const subject = useRef();
  const message = useRef();
  const [active, setActive] = useState(false);
  const toAddress = "danhenrydev@outlook.com";
  const fromAddress = "danielrhenry@gmail.com";
  // const toAddress = "danielhenrydev@gmail.com"

  // ).then(
  //   message => alert(message)
  // );
  // }
  const handleSubmit = (e) => {
    const emailBody =
      "Name: " +
      `${name.current.value}` +
      "<br/>" +
      "Organization: " +
      `${organization.current.value}` +
      "<br/>" +
      "Email Address:" +
      "<br/>" +
      `<a href="mailto:${address.current.value}">${address.current.value}</a>` +
      "<br/>" +
      "<br/>" +
      "Message Body:" +
      "<br/>" +
      message.current.value;
    const fulladdress = `https://api.elasticemail.com/v2/email/send?apikey=${key}&subject=${subject.current.value}&from=${fromAddress}&fromName=&sender=${address.current.value}&senderName=${name.current.value}&msgFrom=&msgFromName=&replyTo=&replyToName=&to=${toAddress}&msgTo=&msgCC=&msgBcc=&lists=&segments=&mergeSourceFilename=&dataSource=&channel=&bodyHtml=${emailBody}&bodyText=&charset=&charsetBodyHtml=&charsetBodyText=&template=&headers_firstname=firstname: myValueHere&postBack=&merge_firstname=John&timeOffSetMinutes=&poolName=My Custom Pool&isTransactional=false&attachments=&trackOpens=true&trackClicks=true&utmSource=source1&utmMedium=medium1&utmCampaign=campaign1&utmContent=content1&bodyAmp=&charsetBodyAmp=`;
    const sendEmail = async () => {
      let res = await fetch(fulladdress);
      let result = await res.json();
      let data = result;
      console.log("data", data);
    };

    e.preventDefault();
    setActive(!active);
    sendEmail();
    address.current.value = "";
    subject.current.value = "";
    message.current.value = "";
    setTimeout(() => {
      setActive(false);
    }, 3000);
  };

  return (
    <div id="contactContent">
      {active ? (
        <div id="sentMessage">Your message has been sent</div>
      ) : (
        <div>
          <div id="contactGreeting">Send Me a Message</div>
          <Form onSubmit={handleSubmit}>
            {/* First Name */}
            <FormGroup className="column" row>
              <Label className="contactDescriptors" for="Name" sm={2}>
                Name
              </Label>
              <Col className="textFields" sm={10}>
                <Input
                  id="name"
                  name="text"
                  required
                  placeholder="enter name"
                  innerRef={name}
                  type="textarea"
                />
              </Col>
            </FormGroup>
            {/* Organization */}
            <FormGroup className="column" row>
              <Label className="contactDescriptors" for="Organization" sm={2}>
                Organization
              </Label>
              <Col className="textFields" sm={10}>
                <Input
                  id="organization"
                  name="text"
                  placeholder="enter organization name"
                  innerRef={organization}
                  type="textarea"
                />
              </Col>
            </FormGroup>
            {/* Email Address */}
            <FormGroup className="column" row>
              <Label className="contactDescriptors" for="email" sm={2}>
                Email Address
              </Label>
              <Col className="textFields" sm={10}>
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

            {/* Subject */}
            <FormGroup className="column" row>
              <Label className="contactDescriptors" for="subject" sm={2}>
                Subject
              </Label>
              <Col className="textFields" sm={10}>
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

            {/* Message Body */}
            <FormGroup className="column" row>
              <Label className="contactDescriptors" for="message" sm={2}>
                Message
              </Label>
              <Col className="textFields" sm={10}>
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
              <Button color="success" id="submitBtn">
                Submit
              </Button>
            </div>
            {/* </Col>
        </FormGroup> */}
          </Form>
        </div>
      )}
    </div>
  );
}

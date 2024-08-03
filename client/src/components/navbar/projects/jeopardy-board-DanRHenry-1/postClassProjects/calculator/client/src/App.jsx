import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Row, Col } from "reactstrap";
import Display from "./components/Display";
import Clear from "./components/functionality/Clear";
import Percent from "./components/operators/Percent";
import Ce from "./components/functionality/Ce";
import Backspace from "./components/functionality/Backspace";
import Seven from "./components/numbers/Seven";
import Eight from "./components/numbers/Eight";
import Nine from "./components/numbers/Nine";
import Four from "./components/numbers/Four";
import Five from "./components/numbers/Five";
import Six from "./components/numbers/Six";
import One from "./components/numbers/One";
import Two from "./components/numbers/Two";
import Three from "./components/numbers/Three";
import PosNeg from "./components/functionality/PosNeg";
import Zero from "./components/numbers/Zero";
import Decimal from "./components/functionality/Decimal";
import Equal from "./components/functionality/Equal";
import Add from "./components/operators/Add";
import Subtract from "./components/operators/Subtract";
import Multiply from "./components/operators/Multiply";
import Divide from "./components/operators/Divide";
import MC from "./components/functionality/MC";
import MS from "./components/functionality/MS";
import MR from "./components/functionality/MR";
function App() {
  // https://wallpapers.com/wallpapers/black-and-white-math-board-zb383dm6tubx3bk2.html
  // https://www.cuemath.com/algebra/equation/

  // class Term {
  //   constructor(input) {
  //     this.term = input;
  //   }
  // }

  let inputArray = [];
  let workingMemory = [];
  let commandQueue = []
  const acceptInput = (input) => {
    inputArray.push(input);
    console.log(inputArray);
  };

  const clearInputArray = () => {
    inputArray = [];
    console.log(inputArray);
  };

  const additionFunction = () => {
    inputArray.map((num) => {
      let term;
      let i = workingMemory.length;
      workingMemory[term[i]].push(num);
    });
    return "Hello, additionFunction Here";
  };

  const toggleUnary = () => {
    console.log("build this out");
  };
  return (
    <>
      <div className="Border">
        <Display
        inputArray = {inputArray}
        >{inputArray[0]}</Display>
        <Container id="face">
        <Row>
            <Col>
              <MC />
            </Col>
            <Col>
              <MR />
            </Col>
            <Col>
              <MS />
            </Col>
            <Col>
              <Backspace inputArray={inputArray} />
            </Col>
          </Row>
          {/* Percent, CE, C, BKSP */}
          <Row>
            <Col>
              <Percent />
            </Col>
            <Col>
              <Ce />
            </Col>
            <Col>
              <Clear clearInputArray={clearInputArray} />
            </Col>
            <Col>
              <Divide inputArray={inputArray} />
            </Col>
          </Row>
          {/* 7, 8, 9 */}
          <Row>
            <Col>
              <Seven inputArray={inputArray} acceptInput={acceptInput} />
            </Col>
            <Col>
              <Eight inputArray={inputArray} acceptInput={acceptInput} />
            </Col>
            <Col>
              <Nine inputArray={inputArray} acceptInput={acceptInput} />
            </Col>
            <Col>
              <Multiply inputArray={inputArray} acceptInput={acceptInput} />
            </Col>
          </Row>
          {/* 4, 5, 6 */}
          <Row>
            <Col>
              <Four inputArray={inputArray} acceptInput={acceptInput} />
            </Col>
            <Col>
              <Five inputArray={inputArray} acceptInput={acceptInput} />
            </Col>
            <Col>
              <Six inputArray={inputArray} acceptInput={acceptInput} />
            </Col>
            <Col>
              <Subtract inputArray={inputArray} acceptInput={acceptInput} />
            </Col>
          </Row>
          {/* 1, 2, 3 */}
          <Row>
            <Col>
              <One inputArray={inputArray} acceptInput={acceptInput} />
            </Col>
            <Col>
              <Two inputArray={inputArray} acceptInput={acceptInput} />
            </Col>
            <Col>
              <Three inputArray={inputArray} acceptInput={acceptInput} />
            </Col>
            <Col>
              <Add
                additionFunction={additionFunction}
                inputArray={inputArray}
                commandQueue = {commandQueue}
              ></Add>
            </Col>
          </Row>
          <Row>
            <Col>
              <PosNeg
                inputArray={inputArray}
                acceptInput={acceptInput}
                toggleUnary={toggleUnary}
              />
            </Col>
            <Col>
              <Zero inputArray={inputArray} acceptInput={acceptInput} />
            </Col>
            <Col>
              <Decimal inputArray={inputArray} acceptInput={acceptInput} />
            </Col>
            <Col>
              <Equal inputArray={inputArray} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default App;

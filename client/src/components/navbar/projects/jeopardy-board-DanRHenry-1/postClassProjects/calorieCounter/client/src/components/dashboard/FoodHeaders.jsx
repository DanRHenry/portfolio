import React from "react";
import { useEffect, useState} from "react";
import { Container, Row, Col } from "reactstrap";
export default function FoodHeaders(props) {

const [weightNum, setWeight] = useState(0);
const [maintainNum, setMaintain] = useState(0);
const [loseOne, setLoseOne] = useState(0);
const [loseTwo, setLoseTwo] = useState(0);

useEffect(() => {
  setWeight(props.information.weight);
  setMaintain(props.information.maintain);
  if (props.information.maintain) {
  setLoseOne(props.information.maintain - 500);
  setLoseTwo(props.information.maintain - 1000);
 }
}, [props.information.weight])


  return (
    <>
      <Container>
        <Row className="row">
          <Col m="auto" className="bg-light border">
            Date: {`${props.month}/${props.day}/${props.year}`}
          </Col>
          <Col m="auto" className="bg-light border">
            Weight: {weightNum}
          </Col>
          <Col m="auto" className="bg-light border">
            Maintain: {maintainNum - props.dailyCalories}
          </Col>
          <Col m="auto" className="bg-light border">
            Lose 1 lb/week: {loseOne - props.dailyCalories}
          </Col>
          <Col m="auto" className="bg-light border">
            Lose 2 lbs/week: {loseTwo - props.dailyCalories}
          </Col>
          <Col m="auto" className="bg-light border">
            Total Calories: {props.dailyCalories}
          </Col>
        </Row>
      </Container>
    </>
  );
}

import React from "react";
// import { Col, Container, Row, Button, Form, Table } from "reactstrap";
import { useState, useEffect } from "react";
// import { useRef } from "react";
import FoodList from "./FoodList";
// import { useNavigate } from "react-router-dom";
import FoodHeaders from "./FoodHeaders";
import { baseurl } from "../../helpers/url";
export default function Dashboard() {
  // const navigate = useNavigate();

  const [information, setInformation] = useState({});
  // const [enterFoodState, setEnterFoodState] = useState(false);
  const [dailyCalories, setDailyCalories] = useState(0);
  const userData = {};

  const token = localStorage.getItem("token");
  let colorAssignment = 0;
  let tempColor;

  const getUserInformation = async () => {
    let url = baseurl + "/user/find";
    const reqOptions = {
      method: "GET",
      headers: new Headers({
        Authorization: token,
      }),
    };

    try {
      const res = await fetch(url, reqOptions);
      const data = await res.json();
      let firstName = data.findUser.firstName;
      let lastName = data.findUser.lastName;
      let age = data.findUser.age;
      let email = data.findUser.email;
      let feet = data.findUser.feet;
      let inches = data.findUser.inches;
      let weight = data.findUser.weight;
      let maintain = data.findUser.maintain;
      userData.firstName = firstName;
      userData.lastName = lastName;
      userData.age = age;
      userData.email = email;
      userData.feet = feet;
      userData.inches = inches;
      userData.weight = weight;
      userData.maintain = maintain;
      setInformation(userData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserInformation();
  }, []);

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Add table striping
  if (colorAssignment === 0) {
    tempColor = "table-success";
    colorAssignment = 1;
  } else {
    tempColor = "table-secondary";
    colorAssignment = 0;
  }

  return (
    <div  className="mainDiv">
      <FoodHeaders
        month={month}
        day={day}
        year={year}
        information={information}
        dailyCalories={dailyCalories}
      />
      <FoodList
        information={information}
        day={date.getDate()}
        month={date.getMonth() + 1}
        year={date.getFullYear()}
        setDailyCalories={setDailyCalories}
        dailyCalories={dailyCalories}
      />
    </div>
  );
}

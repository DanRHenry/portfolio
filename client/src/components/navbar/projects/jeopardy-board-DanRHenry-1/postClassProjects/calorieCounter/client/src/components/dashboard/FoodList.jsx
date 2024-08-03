import React from "react";
// import { useRef } from "react";
import { useEffect, useState, useRef } from "react";
import { Table, Container } from "reactstrap";
import AddFoodItem from "./AddFoodItem";
import { Button } from "reactstrap";
import { baseurl } from "../../helpers/url";
import EditFoodItem from "./Edit/EditFoodItem";
import EditCalories from "./Edit/EditCalories"
import EditQuantity from "./Edit/EditQuantity"
import EditUnit from "./Edit/EditUnit"
import DisplayFoodItem from "./display/DisplayFoodItem";
import DisplayCalories from "./display/DisplayCalories";
import DisplayQuantity from "./display/DisplayQuantity";
import DisplayTotal from "./display/DisplayTotal";
import DisplayUnit from "./display/DisplayUnit";


// import { createRoutesFromElements } from "react-router-dom";

// import { useParams, useNavigate } from "react-router-dom";

export default function FoodList(props) {
  // let tempColorValue = "greyRow";
  let tempColorValue = useRef("greyRow");
  let currentCalories = 0;
  const [foodData, setFoodData] = useState();
  //   let [day, setDay] = useState(props.day)
  const userEmail = props.information.email;
  const thisDay = props.day;
  const thisMonth = props.month;
  const thisYear = props.year;
  const [currentDay, setDay] = useState(thisDay);
  const [currentMonth, setMonth] = useState(thisMonth);
  const [currentYear, setYear] = useState(thisYear);
  const [foodItemEditCheck, setFoodItemEditCheck] = useState();
  const [quantityEditCheck, setQuantityEditCheck] = useState();
  const [unitEditCheck, setUnitEditCheck] = useState();
  const [calorieEditCheck, setCalorieEditCheck] = useState();
  const [foodDisplay, setFoodDisplay] = useState();
  const [caloriesDisplay, setCaloriesDisplay] = useState();
  const [quantityDisplay, setQuantityDisplay] = useState();
  const [unitDisplay, setUnitDisplay] = useState();
  const [totalDisplay, setTotalDisplay] = useState();

  //   --------------------- GET -----------------

  let getFoodInformation = async function () {
    const reqOptions = {
      method: "GET",
      headers: new Headers({}),
    };
    let url = baseurl+`/food/`;
    try {
      const res = await fetch(url, reqOptions);
      const data = await res.json();
      if (data.message === "All Food Items:") {
        setFoodData(data.getAllFoodItems);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (tempColorValue === "greyRow") {
      tempColorValue = "whiteRow";
    } else {
      tempColorValue = "greyRow";
    }
  });

  useEffect(() => {
    getFoodInformation();
    displayFoodItems();
  }, []);


  useEffect(() => {
    // if (currentCalories != currentCalories) {
      props.setDailyCalories(currentCalories);
    // }
    
  });
  
  let displayFoodItems = () => {
    // currentCalories = 0;
    foodData?.map((item) => {
      let dayToGrab = currentDay;
      if (dayToGrab < 10) {
        dayToGrab = `0${currentDay.toString()}`;
      } else {
        dayToGrab = currentDay.toString();
      }
      //! potentially move this to the back end to reduce future bandwidth

      if (
        item.date ===
          currentYear.toString() +
            currentMonth.toString() +
            dayToGrab.toString() &&
        userEmail === item.creatorName
      ) {
        let foodName = item.foodName;
        // let mealCategory = item.mealCategory;
        let unit = item.unit;
        let quantity = item.quantity;
        let calories = item.calories;
        // let mealType = item.mealType;
        let totalCalories = quantity * calories;
        currentCalories += totalCalories;

        const foodID = "food_"+foodData.indexOf(item);
        const quantityID = "quantity_"+foodData.indexOf(item);
        const unitID = "unit_"+foodData.indexOf(item);
        const caloriesID = "calories_"+foodData.indexOf(item);

        const editFoodNames = () => {
          const foodItem = document.getElementById(foodID);
          foodItem.style.color = "blue"
          // console.log("clicked food names")
        }
        const editQuantity = () => {
          const foodItem = document.getElementById(quantityID);
          foodItem.style.color = "blue"
        }

        const editUnit = () => {
          const foodItem = document.getElementById(unitID);
          foodItem.style.color = "blue"
          // console.log("clicked Unit")
        }

        const editCalories = () => {
          const foodItem = document.getElementById(caloriesID);
          foodItem.style.color = "blue"
          // console.log("clicked calories")
          
        }



        // console.log("foodData", foodData)
        // console.log("item", item)
        // --------------------------------------- Food Display Item ----------------------------------------------------
        if (foodID === foodItemEditCheck ) { foodDisplay = <EditFoodItem
          information = {props.information}
        />
        } else if (foodID != foodItemEditCheck)
        {
          <tr className="tableItems tableContainer" key={foodData.indexOf(item)}>
          setFoodDisplay (<DisplayFoodItem
          editFoodNames = {editFoodNames}
          foodID = {foodID}
          item = {item}
          foodName = {foodName}
          setFoodItemEditCheck = {setFoodItemEditCheck} 
          />)
          </tr>


        // return (
        //   foodDisplay
        // );
      }
        // ---------------------------------------- Calorie Display ------------------------------------------------------
        if (caloriesID === calorieEditCheck ) { setCaloriesDisplay (<EditCalories
          information = {props.information}
        />)
        } else if (caloriesID != calorieEditCheck)
        {
          <tr className="tableItems tableContainer" key={foodData.indexOf(item)}>
          setCalorieDisplay (<DisplayCalories
          editFoodNames = {editFoodNames}
          editQuantity = {editQuantity}
          editUnit = {editUnit}
          editCalories = {editCalories}
          foodID = {foodID}
          quantityID = {quantityID}
          unitID = {unitID}
          caloriesID = {caloriesID}
          foodData = {foodData}
          item = {item}
          foodName = {foodName}
          quantity = {quantity}
          unit = {unit}
          calories = {calories}
          totalCalories = {totalCalories}
          setFoodItemEditCheck = {setFoodItemEditCheck} 
          />)
          </tr>
      }

        // ---------------------------------------- Quantity Display -----------------------------------------------------
        if (foodID === foodItemEditCheck ) { setQuantityDisplay (<EditQuantity
          information = {props.information
          }
        />)
        } else if (foodID != foodItemEditCheck)
        {
          <tr className="tableItems tableContainer" key={foodData.indexOf(item)}>
          setQuantityDisplay (<DisplayQuantity
          editFoodNames = {editFoodNames}
          editQuantity = {editQuantity}
          editUnit = {editUnit}
          editCalories = {editCalories}
          foodID = {foodID}
          quantityID = {quantityID}
          unitID = {unitID}
          caloriesID = {caloriesID}
          foodData = {foodData}
          item = {item}
          foodName = {foodName}
          quantity = {quantity}
          unit = {unit}
          calories = {calories}
          totalCalories = {totalCalories}
          setFoodItemEditCheck = {setFoodItemEditCheck} 
          />)
          </tr>
          // console.log("no match","foodID", foodID, "foodItemEditCheck", foodItemEditCheck)

        // return (
        //   quantityDisplay
        // );
      }


        // ------------------------------------------ Unit Display -------------------------------------------------------
        if (unitID === unitEditCheck ) { setUnitDisplay (<EditUnit
          information = {props.information}
        />)
        } else if (unitID != unitEditCheck)
        {
          <tr className="tableItems tableContainer" key={foodData.indexOf(item)}>
          setUnitDisplay (<DisplayUnit
          editFoodNames = {editFoodNames}
          editQuantity = {editQuantity}
          editUnit = {editUnit}
          editCalories = {editCalories}
          foodID = {foodID}
          quantityID = {quantityID}
          unitID = {unitID}
          caloriesID = {caloriesID}
          foodData = {foodData}
          item = {item}
          foodName = {foodName}
          quantity = {quantity}
          unit = {unit}
          calories = {calories}
          totalCalories = {totalCalories}
          setFoodItemEditCheck = {setFoodItemEditCheck} 
          />)
          </tr>

        // return (
        //   unitDisplay
        // );
      }

        // ------------------------------------------ Total Display ------------------------------------------------------        
        if (foodID === foodItemEditCheck ) { setTotalDisplay (<EditFoodItem
          information = {props.information}
        />)
        } else if (foodID != foodItemEditCheck)
        {
          <tr className="tableItems tableContainer" key={foodData.indexOf(item)}>
          totalDisplay = <DisplayTotal
          editFoodNames = {editFoodNames}
          editQuantity = {editQuantity}
          editUnit = {editUnit}
          editCalories = {editCalories}
          foodID = {foodID}
          quantityID = {quantityID}
          unitID = {unitID}
          caloriesID = {caloriesID}
          foodData = {foodData}
          item = {item}
          foodName = {foodName}
          quantity = {quantity}
          unit = {unit}
          calories = {calories}
          totalCalories = {totalCalories}
          setFoodItemEditCheck = {setFoodItemEditCheck} 
          />
          </tr>
          // console.log("no match","foodID", foodID, "foodItemEditCheck", foodItemEditCheck)

        // return (
        //   foodDisplay
        // );
      }

        //! ------------------------------------------------ Quantity Display & Edit --------------------------------------------

        if (quantityID === quantityEditCheck ) { 
          quantityDisplay = <EditFoodItem
        //   setFoodItemEditCheck = {setFoodItemEditCheck}
          information = {props.information}
        />

        } else if (quantityID !== quantityEditCheck)
        {
          quantityDisplay = <DisplayQuantity
          editFoodNames = {editFoodNames}
          editQuantity = {editQuantity}
          editUnit = {editUnit}
          editCalories = {editCalories}
          foodID = {foodID}
          quantityID = {quantityID}
          unitID = {unitID}
          caloriesID = {caloriesID}
          foodData = {foodData}
          item = {item}
          foodName = {foodName}
          quantity = {quantity}
          unit = {unit}
          calories = {calories}
          totalCalories = {totalCalories}
          setQuantityEditCheck = {setQuantityEditCheck} 
          />

        // return (
        //   quantityDisplay
        // );
      }

        //! --------------------------------------------------- Unit Display & Edit ---------------------------------------------

        if (unitID === unitEditCheck ) { 
          unitDisplay = <EditFoodItem
        //   setFoodItemEditCheck = {setFoodItemEditCheck}
          information = {props.information}
        />

        } else if (unitID !== unitEditCheck)
        {
          quantityDisplay = <DisplayUnit
          editFoodNames = {editFoodNames}
          editQuantity = {editQuantity}
          editUnit = {editUnit}
          editCalories = {editCalories}
          foodID = {foodID}
          quantityID = {quantityID}
          unitID = {unitID}
          caloriesID = {caloriesID}
          foodData = {foodData}
          item = {item}
          foodName = {foodName}
          quantity = {quantity}
          unit = {unit}
          calories = {calories}
          totalCalories = {totalCalories}
          setUnitEditCheck = {setUnitEditCheck} 
          />

        // return (
        //   quantityDisplay
        // );
      }

        //! ------------------------------------------------- Calorie Display & Edit --------------------------------------------

        if (caloriesID === calorieEditCheck ) { 
          caloriesDisplay = <EditFoodItem
        //   setFoodItemEditCheck = {setFoodItemEditCheck}
          information = {props.information}
        />

        } else if (caloriesID !== calorieEditCheck)
        {
          caloriesDisplay = <DisplayCalories
          editFoodNames = {editFoodNames}
          editQuantity = {editQuantity}
          editUnit = {editUnit}
          editCalories = {editCalories}
          foodID = {foodID}
          quantityID = {quantityID}
          unitID = {unitID}
          caloriesID = {caloriesID}
          foodData = {foodData}
          item = {item}
          foodName = {foodName}
          quantity = {quantity}
          unit = {unit}
          calories = {calories}
          totalCalories = {totalCalories}
          setCalorieEditCheck = {setCalorieEditCheck} 
          />

        // return (
        //   caloriesDisplay
        // );
      }

        // ---------------------------------------- Calorie Display ------------------------------------------------------
        if (caloriesID === calorieEditCheck ) { caloriesDisplay = <EditCalories
          information = {props.information}
        />
        } else if (caloriesID != calorieEditCheck)
        {
          <tr className="tableItems tableContainer" key={foodData.indexOf(item)}>
          display = <DisplayCalories
          editFoodNames = {editFoodNames}
          editQuantity = {editQuantity}
          editUnit = {editUnit}
          editCalories = {editCalories}
          foodID = {foodID}
          quantityID = {quantityID}
          unitID = {unitID}
          caloriesID = {caloriesID}
          foodData = {foodData}
          item = {item}
          foodName = {foodName}
          quantity = {quantity}
          unit = {unit}
          calories = {calories}
          totalCalories = {totalCalories}
          setFoodItemEditCheck = {setFoodItemEditCheck} 
          />
          </tr>

        // return (
        //   caloriesDisplay
        // );
      }
    }
    });
    // return (
    //   foodDisplay
    // )
  }

  const calendar = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
    leapMonth: 29,
  };

  let prevDay = () => {
    if (currentDay > 1) {
      //* If the day of the month is not the 1st...
      setDay(currentDay - 1); //* Subtract a day
    } else {
      //* If the day of the month IS the 1st...
      if (currentMonth > 1); //* If the current month is not January...
      {
        if (currentYear % 4 === 0 && currentMonth === 3) {
          //* If it IS a leap year, and it was March...
          setMonth(currentMonth - 1);
          setDay(calendar["leapMonth"]);
        } else {
          //* If it's not a leap year...
          setMonth(currentMonth - 1);
          let tempMonth = (currentMonth - 1).toString();
          setDay(calendar[`${tempMonth}`]);
        }
        if (currentMonth === 1) {
          //* If it IS January
          setYear(currentYear - 1); //* Subtract a year
          setMonth(12); //* Set the month to December
          setDay(calendar[`${currentMonth}`]); //* Set the day to the end of december
        }
        getFoodInformation();
      }
    }
  };

  let nextDay = () => {
    //* If it is December, and the day is the last of the month...
    if (currentMonth === 12 && currentDay === calendar[`${currentMonth}`]) {
      setYear(currentYear + 1); //* Add a year
      setMonth(1); //* Set the month to January
      setDay(1); //* Set the day to the start of January
    }
    //* If the current month is not December...
    else if (currentMonth < 12);
    {
      //* If it IS a leap year, and it is February...
      if (currentYear % 4 === 0 && currentMonth === 2) {
        //* If the day is not the last of the leap month...
        if (currentDay < 29) {
          setDay(currentDay + 1);
        }
        //* If the day is the last of the leap month...
        else {
          setDay(1);
          setMonth(currentMonth + 1);
        }
      }
      //* If it is not December, and the current day is the last of the month...
      else if (
        currentDay === calendar[`${currentMonth}`] &&
        currentMonth !== 12
      ) {
        setDay(1);
        setMonth(currentMonth + 1);
      } else if (currentDay < calendar[`${currentMonth}`]) {
        setDay(currentDay + 1);
      }
    }
    getFoodInformation();
  };

  return (
    <>
    <Container>
      <AddFoodItem
        information={props.information}
        day={props.day}
        month={props.month}
        year={props.year}
        setFoodData={setFoodData}
        getFoodInformation={getFoodInformation}
        setDailyCalories={props.setDailyCalories}
        dailyCalories={props.dailyCalories}
      />
      <div>
        {currentMonth}/{currentDay}/{currentYear}
      </div>
      <div id="buttons">
        <Button className="button" onClick={prevDay}>
          Prev
        </Button>
        <Button className="button" onClick={nextDay}>
          Next
        </Button>
      </div>
      <Table striped>
        <thead id="tableHeader">
          <tr className="tableHeaderLabels">
            <th>Food Name</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Calories Per</th>
            <th>Total Calories</th>
          </tr>
        </thead>
        {/* <tr> */}
          <tbody id="tableBody">{displayFoodItems()}</tbody>
        <tbody id = "tableBody">

          {/* <DisplayFoodItem/>
          <DisplayQuantity/>
          <DisplayUnit/>
          <DisplayCalories/>
          <DisplayTotal/> */}
          </tbody>
        {/* </tr> */}
      </Table>
      </Container>
    </>
  );
}

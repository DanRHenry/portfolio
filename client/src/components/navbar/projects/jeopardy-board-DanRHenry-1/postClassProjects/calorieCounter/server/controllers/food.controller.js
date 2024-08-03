const router = require("express").Router();
const Food = require("../models/food.model");

const serverError = (res, error) => {
  console.log("Server-side error");
  return res.status(500).json({
    Error: error.message,
  });
};

// ------------------------ POST ----------------------

router.post("/storeFood", async (req, res) => {
  try {
    // console.log("req.body", req.body);
    // Creating a new object based off the Model Schema.
    const food = new Food({
      creatorName: req.body.creatorName,
      date: req.body.date,
      foodName: req.body.foodName,
      mealCategory: req.body.mealCategory,
      unit: req.body.unit,
      quantity: req.body.quantity,
      calories: req.body.calories,
      mealType: req.body.mealType,
    }); // using values from req.body to form our object.

    const newFood = await food.save(); // Writes to database. Returns a response - why it should be an "await".

    // Create a token using the sign method of jwt, (payload, message, exp)
    // The payload should be the user ID, and secret message should eventually be in the .env
    //   const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1 day" });
    if (newFood) {
      console.log("newFood:", newFood);
    }
    res.status(200).json({
      food: newFood,
      message: "Success! Food Saved!",
    });
  } catch (err) {
    res.status(500).json({
      ERROR: err.message,
    });
  }
});

// ------------------------ PATCH ----------------------

router.patch ("/edit/", async (req, res) => {
  try {
    const id = req.food._id;
    const foodFilter = {_id: id};
    const { creatorName, date, foodName, mealCategory, unit, quantity, calories, mealType } = req.body;
  
    const info = {
      creatorName: creatorName,
      date: date,
      foodName: foodName,
      mealCategory: mealCategory,
      unit: unit,
      quantity: quantity,
      calories: calories,
      mealType: mealType,
    }

    // not sure what this does...
    const returnOption = { new: true};
    const updatedFoodInformation = await Food.findOneAndUpdate(
      foodFilter,
      info,
      returnOption
      )
      if (!updatedFoodInformation) {
        return res.status(404).json({
          message: `Food entry not found.`
        });
      }
      updatedFoodInformation
        ? res.status(200).json({
          message: `Food entry updated` 
        })
        : res.status(404).json({
          message: `Food entry not found.`
        })
  } catch (err) {
    serverError(res, err);
  }
})

// ------------------------- GET -----------------------

router.get("/find/:id", async (req, res) => {
  try {
    // const id = req.food._id;
    const { id } = req.params;
    console.log("id:", id);
    // console.log("req",req.body)
    const findFood = await Food.findOne({ _id: id });

    findFood
      ? res.status(200).json({
          message: "Found!",
          findFood,
        })
      : res.status(404).json({
          message: `Can't Find the Food.`,
        });
  } catch (err) {
    serverError(res, err);
  }
})

// --------------------------Get All ---------------------
  router.get("/", async (req, res) => {
    try {
      const getAllFoodItems = await Food.find();
      getAllFoodItems
        ? res.status(200).json({
            message: "All Food Items:",
            getAllFoodItems,
          })
        : res.status(404).json({
            message: `No Food Found!`,
          });
    } catch (err) {
      serverError(res, err);
    }
  });

module.exports = router;

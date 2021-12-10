const express = require('express');
const router = express.Router()

const User = require('../models/user.model')

const { body, validationResult } = require('express-validator');
router.post('/', 
  body("first_name").notEmpty().withMessage("Firstname is required") ,
  body("last_name").notEmpty().withMessage("Firstname is required"),
  body("email").isEmail().withMessage("Not a valid mail id"),
  body("pincode").isLength({ min: 6, max:6 }).withMessage("Not a valid pincode"),
  body("age").custom(value => {
    // console.log("value", value)
    if (value < 0 || value > 100){
      throw new Error("Age must be between 1 to 100")
    }
    return true
  }),
  body("gender").custom(value =>{
    if (value === "Male" || value === "Female" || value === "Others"){
      return true
    }
    throw new Error("Please add a valid gender")
  }),
  
  async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    /* {
    "errors": [
        {
            "value": 1730346,
            "msg": "Not a valid pincode",
            "param": "pincode",
            "location": "body"
        }
    ]
} */
  try {
    const user = await User.create(req.body);

    res.status(201).send(user);
  } catch (e) {
    res.status(500).json({
      message: e.message
    })
  }
})


    router.get('/', async (req, res) => {
      try {
        const user = await User.find().lean().exec()
        res.status(201).send(user);
      } catch (e) {
        res.status(500).json({
          message: e.message
        })
      }
    })

    module.exports = router

const foodPartnerModel = require("../models/foodpartner.models");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

/*
Auth routes mein jab bhi ek food partner register karta hai ya log in karta hai tab ham use ek token dete hai
since use cookies mein daala hai, to has req ke saath aapke server pe vo data aata hi aata hai. 
and uske liye hame ek middleware use karna hota hai jo hamne 
app.use(cookieparser()) se use kiya hai
*/

async function authFoodPartnerMiddleware(req, res, next) {
  const token = req.cookies.token;
  // ham req mein aane wale cookies se token ko le rahe hai.
  // agar user ne login/register nahi kiya hai to uske paas token nahi hoga.

  if (!token) {
    return res.status(401).json({
      message: "please login first",
    });
  }

  // check to karna padega ki cookie jo paas ho rahi hai vo valid hai ya nahi
  try {
    // jwt mein yaha user ke token aur uske SECRET token ko verify karti hai
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // yaha pe user ki _id decoded mein store ho jayegi. only when token sahi hoga

    const foodPartner = await foodPartnerModel.findById(decoded.id);

    // Check if food partner exists in database
    if (!foodPartner) {
      return res.status(401).json({
        message: "Food partner not found",
      });
    }

    req.foodPartner = foodPartner;
    // req mein foodPartner jaisi koi property hai nahi, but yaha pe ham, request mein ek nayi property create kar rahe hai

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
}

async function authUserMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "please login first",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fixed: userModelModel -> userModel
    const user = await userModel.findById(decoded.id);

    // Check if user exists in database
    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
}

module.exports = {
  authFoodPartnerMiddleware,
  authUserMiddleware,
};

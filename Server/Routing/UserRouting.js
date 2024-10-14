const express = require("express");
const router = express.Router();
const { getUser, insertUser, getUserById, updateUserData, deleteUserData, userImage } = require("../Controller/UserController");

router.get("/showUser", getUser);

router.post("/insertUser", userImage.single("image"), insertUser);

router.get("/getId/:id", getUserById);

router.put("/updateData/:id", updateUserData);

router.delete("/deleteData/:deleteId", deleteUserData);







module.exports = router;
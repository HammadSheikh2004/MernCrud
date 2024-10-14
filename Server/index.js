const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const { connect } = require("./Connection");
const UserRoutes = require("./Routing/UserRouting");
app.use(express.static('public'));
app.use('/Images/UserImages', express.static('images'));


app.use("/user", UserRoutes)


app.listen(3000, () => {
    console.log("Server is Starting!");
})
const express = require("express");
const router = express.Router();

const { register, login, getUsers, deleteUsersbyid, updateuserbyid } = require("../controllers/usercontroller");

router.post("/register", register);
router.post("/login", login);
router.get("/getUsers", getUsers);
router.delete("/deleteUsersbyid/:id", deleteUsersbyid);
router.put("/updateuserbyid/:id", updateuserbyid);

module.exports = router;

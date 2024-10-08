const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  getUserById,
  updateUser,
  deleteUser,
} = require("../Controllers/userController");
router.get("/getUser", authMiddleware, getUserById);
router.patch("/updateUser", authMiddleware, updateUser);
router.delete("/deleteUser", authMiddleware, deleteUser);
module.exports = router;

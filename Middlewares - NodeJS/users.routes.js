const express = require("express");

// Controllers
const {
	createUser,
	getUserById,
	updateUser,
	disableUserAccount,
	loginUser,
} = require("../controllers/users.controller");

// Middlewares
const {
	createUserValidations,
	updateUserValidations,
	loginUserValidations,
	validateResult,
} = require("../middlewares/validators.middleware");

const {
	protectSession,
	protectUpdateUser,
} = require("../middlewares/auth.middleware");

const router = express.Router();

// Get - Get user profile

// Get - Get user by id
// Patch - Update user profile (email, name)
// Delete - Disable user account
router
	.route("/:id")
	.get(getUserById)
	.patch(
		protectSession,
		protectUpdateUser,
		updateUserValidations,
		validateResult,
		updateUser
	)
	.delete(protectSession, protectUpdateUser, disableUserAccount);

// Post - Create new user
router.post("/", createUserValidations, validateResult, createUser);

router.post("/login", loginUserValidations, validateResult, loginUser);

module.exports = { userRouter: router };
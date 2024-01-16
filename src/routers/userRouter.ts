import express from "express";
import { register } from "../controllers/signupController";
import { login } from "../controllers/loginController";
import { verifyToken } from "../utils";
import { userList } from "../controllers/userlistController";
import { updateUser } from "../controllers/userController";

const router = express.Router();



/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Register'
 *       500:
 *         description: An error occurred during registration
 */
router.post('/register', async (req: express.Request, res: express.Response) => {
    await register(req as any, res as any); // Use 'as any' to avoid TypeScript error temporarily
  });

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *       401:
 *         description: Incorrect email or password
 *       404:
 *         description: User not found
 *       500:
 *         description: An error occurred during login
 */
router.post('/login', login);

/**
 * @swagger
 * /list:
 *   get:
 *     summary: Get a list of usernames
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of usernames
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserList'
 *       500:
 *         description: An error occurred while fetching usernames
 */
router.get('/list', verifyToken, userList);

/**
 * @swagger
 * /update-user:
 *   put:
 *     summary: Update user information
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdateInput'
 *     responses:
 *       200:
 *         description: User information updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Register'
 *       401:
 *         description: Unauthorized - User not logged in
 *       500:
 *         description: An error occurred during the update
 */
router.put('/update-user', verifyToken, updateUser);


export default router;
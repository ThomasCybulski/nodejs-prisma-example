import { Routes } from '@interfaces/routes.interface';
import { validateRequest } from '@middlewares/validator.middleware';
import { Router } from 'express';
import { DeleteUserDTO } from './dto/delete-user.dto';
import { UserDTO } from './dto/user.dto';
import { UserController } from './user.controller';

export class UserRoute implements Routes {
  router = Router();

  userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * Returns a list with all user.
     * @openapi
     * /users:
     *   get:
     *     tags: [User]
     *     summary: Returns a list with all user
     *     description: Returns a list with all user.
     *     responses:
     *       200:
     *         description: Returns a list with id and name of all user
     */
    this.router.get('/users', this.userController.getUsers);

    /**
     * Returns a single user.
     * @openapi
     * /users/{email}:
     *   get:
     *     tags: [User]
     *     summary: Returns a single user.
     *     description: Returns a single user, otherwise null.
     *     parameters:
     *       - name: email
     *         description: The email of the user
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Returns a single user.
     *       404:
     *         description: User not found
     */
    this.router.get('/users/:email', this.userController.getUserByEmail);

    /**
     * Request to create a user.
     * @openapi
     * /users:
     *   post:
     *     tags: [User]
     *     summary: Request to create a new user.
     *     description: Request to create a new user.
     *     requestBody:
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              email:
     *                type: string
     *              name:
     *                type: string
     *            required:
     *              - email
     *              - name
     *            example:   # Sample object
     *              email: "myapp@example.com"
     *              name: "Max Mustermann"
     * responses:
     *       200:
     *         description: User has been operated.
     */
    this.router.post('/users', [validateRequest(UserDTO, false)], this.userController.createUser);

    /**
     * Update a existing user
     * @openapi
     * /users:
     *   put:
     *     tags: [User]
     *     summary: Update a existing user
     *     description: Update a existing user
     *     requestBody:
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              email:
     *                type: string
     *              name:
     *                type: string
     *            required:
     *              - email
     *              - name
     *            example:   # Sample object
     *              email: "myapp@example.com"
     *              name: "Max Mustermann"
     * responses:
     *       200:
     *         description: User has been operated.
     */
    this.router.put('/users', [validateRequest(UserDTO, false)], this.userController.updateUser);

    /**
     * Delete a user.
     * @openapi
     * /users/{email}:
     *   delete:
     *     tags: [User]
     *     summary: Delete a user.
     *     description: Delete a user.
     *     parameters:
     *       - name: email
     *         description: The email of the user
     *         in: path
     *         required: true
     *         type: string
     * responses:
     *       200:
     *         description: User has been operated.
     */
    this.router.delete('/users/:email', [validateRequest(DeleteUserDTO, false)], this.userController.deleteUser);
  }
}

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API documentation for Express.js project',
            servers: ["https://localhost:3000/api/users"]
        },
        components: {
            schemas: {
                Login: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        username: { type: 'string' },
                        email: { type: 'string' },
                        // Add other properties as needed
                    },
                },
                Register: {
                    type: 'object',
                    properties: {
                        email: { type: 'string', format: 'email' },
                        password: { type: 'string', format: 'password' },
                        username: { type: 'string' },
                        age: { type: 'number' },
                        imgurl: { type: 'string' },
                        gender: { type: 'string', enum: ['male', 'female'] },
                        // Add other properties as needed
                    },
                    required: ['email', 'password', 'username', 'age', 'gender'],
                },
                UserList: {
                    type: 'object',
                    properties: {
                        userId: { type: 'string' },
                        usernames: { type: 'array', items: { type: 'string' } },
                        // Add other properties as needed
                    },
                },
                UserUpdateInput: {
                    type: 'object',
                    properties: {
                        token: { type: 'string' },
                        userUpdateInput: { $ref: '#/components/schemas/Register' },
                    },
                    required: ['token', 'userUpdateInput'],
                },
            },
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            security: [{ bearerAuth: [] }],
        },
    },
    apis: ['src/routers/userRouter.ts'],
};

const swaggerSpecs = swaggerJsdoc(options);

module.exports = swaggerSpecs;

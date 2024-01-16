import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routers/userRouter';
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs= require('./swaggerConfig');
const app = express();
const fileUpload = require('express-fileupload')
dotenv.config();

const conString= process.env.DB||"mongodb://localhost:27017";

mongoose.connect(conString).then(()=>{
    console.log('connected to db');
})
.catch((err)=>{
    console.log(err.message);
});
app.use(express.json({limit:'10mb'}));
app.use(fileUpload({
    useTempFiles:true,limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use('/',router);

const port=process.env.PORT||3000;
app.listen(port,()=>{console.log(`Running at port ${port}`)})
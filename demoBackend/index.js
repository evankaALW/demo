const firebase = require('firebase/app');
require('firebase/analytics');
//imports firebase to integrate database with Google Studio
const express = require('express');//

const cors = require("cors");//

const bodyParser = require('body-parser');//

//.env configurations
require('dotenv').config();
const fs = require('fs');

const app = express();
const port = 8010;

const seque = require('./config/db');

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const videoTable = require('./models/videoTable');
const userData = require('./models/userData');
const userResponse = require('./models/userResponses')
const schedulerData = require('./models/schedulerData');
const brandTable = require('./models/brandTable');
const videoData = require('./models/videoData');
const clickerTable = require('./models/clickerTable');

const userResponseRoute = require('./routes/userResponseRoute');
const schedulerDataRoute = require('./routes/schedulerDataRoute');
const uploadVideoRoute = require('./routes/uploadVideoRoute');
const saveSchedulerDataRoute = require('./routes/saveSchedulerDataRoute');
const changeDisplayToggleRoute = require('./routes/changeDisplayToggleRoute');
const postUserResponseRoute = require('./routes/postUserResponseRouter');
const allVideoDetailsRoute = require('./routes/allVideoDetailsRoute');
const videoTableRouter = require('./routes/videoTableRoute');
const getClickerAndCardDetailsRouter = require('./routes/getClickerAndCardDetailsRouter');
const allBrandDetailsRouter = require('./routes/allBrandDetailsRouter')


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNEeLe0MWwg-FgsRkjj5o_oumBn5wnvaM",
  authDomain: "alwll-d650f.firebaseapp.com",
  projectId: "alwll-d650f",
  storageBucket: "alwll-d650f.appspot.com",
  messagingSenderId: "484336130576",
  appId: "1:484336130576:web:2b75b3682f874d6094c895",
  measurementId: "G-8VX9E715WM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Routes
app.use('/api', schedulerDataRoute);//5
app.use('/api', userResponseRoute);
app.use('/api',uploadVideoRoute);//1
app.use('/api',saveSchedulerDataRoute);//4
app.use('/api',changeDisplayToggleRoute);
 app.use('/api',postUserResponseRoute);
app.use('/api',allVideoDetailsRoute);//2
app.use('/api',videoTableRouter);//3
app.use('/api',getClickerAndCardDetailsRouter);
app.use('/api',allBrandDetailsRouter);
seque.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((error) => {
  console.error('Unable to sync database: ', error);
});


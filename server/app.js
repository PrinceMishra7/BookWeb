if  (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const {google} = require('googleapis');
const fs = require('fs');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodoverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const Admin = require('./models/admin');
const drive = require('./routes/drive');
const auth = require('./routes/auth');
const gr = require('./routes/gr');
const service = require('./routes/service');
const MongoDBStore = require('connect-mongo');
const cors = require('cors');
const Dburl = process.env.DB_URL
const requests = require('./routes/request');
const bodyParser = require('body-parser');
const countapi = require('countapi-js');

mongoose.set('strictQuery', true);
mongoose.connect(Dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const app = express();
app.use(cors());
app.use('/static', express.static('static'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({limit:'50mb', extended: true, parameterLimit:50000}));
app.use(express.static(path.join(__dirname, "..", "client", "build")));

const secret = 'thisASecret';
const store = new MongoDBStore({
    mongoUrl: Dburl,
    secret,
    touchAfter: 24*3600
    })
    
    store.on("error", function(e){
        console.log("session Store error", e)
    })
    
    const sessionConfig = {
        store,
        name: 'session',
        secret,
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            // secure: true,
            expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
            maxAge: 1000 * 60 * 60 * 24 * 7,
        }
    
    }
app.use(session(sessionConfig));



app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Admin.authenticate()))
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());


app.use('/drive', drive);
app.use('/get', requests)
app.use('/auth', auth)
app.use('/gr', gr)
app.use('/sr', service)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
})


app.listen((5001),()=>{
    console.log('Server running on port: 5001')
})






  

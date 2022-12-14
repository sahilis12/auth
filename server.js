if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

//import start
const express = require ('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const initializePassport = require('./passport-config')
const flash = require('express-flash');
const session = require('express-session')
//imports end



const users = []

initializePassport(passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
    )
app.use(express.urlencoded({extended: false}));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, //we wont resave the session var if nothing is changed
    saveUninitialized:false
}))

app.use(passport.initialize());
app.use(passport.session());
//variables
const port = 3000;
// const password = req.body.password;
//variables end
//config login
app.post('/login', passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash:true
}))

//configuring register
app.post('/register', async (req,res) => {
    // const hashedPassword = await bcrypt.hash(req.body.password, 10)
    try {
        users.push({
            id:Date.now().toString(),
            name:req.body.username,
            email:req.body.email,
            password:req.body.password
        })
        // password:hashedPassword,
       console.log(users);
    //    res.redirect('/login');
    res.redirect('/')
    } catch(e)  {
        console.log(e);
        res.redirect('/register')
    }
})
//routes 
app.get('/', (req,res)=>{
    res.render('index.ejs')
    // res.send('welcome'+ users.username)
})

app.get('/login', (req,res)=>{
    res.render('login.ejs')
   
})
app.get('/register', (req,res)=>{
    res.render('register.ejs')
    // res.render('facebook.html')
    }
)

//routes end
app.listen(port,(req,res) => {
    console.log("server up and running on 3000");
})
const express=require('express');
const app=express(); // creating an instance
const passport = require('./config/passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path'); 
const isAuth=require('./middleware/auth').isAuth;
//const paymentRouter=require("./config/payment");
app.use(express.json()); //req response format
// app.use(express.static(path.resolve(__dirname,'build')));
app.use(express.static(path.join(__dirname, "frontend/build")));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());

const cors = require('cors');
app.use(cors({exposedHeaders:['X-Total-Count']}));
app.use(express.raw({type: 'application/json'}));
//route imports
const basic=require("./routes/basicRouter");
const productsRouter=require("./routes/Product");
const categoriesRouter = require('./routes/Category');
const brandsRouter = require('./routes/Brand');
const usersRouter = require('./routes/Users');
const authRouter = require('./routes/Auth');
const cartRouter = require('./routes/Cart');
const ordersRouter = require('./routes/Order');
const razorPayment=require('./routes/Rpayment');
const forgotpassword=require('./routes/Mail');
const sendInvoice = require('./routes/Order');
//const checkPayment=require('./routes/Payment');
// This is your test secret API key.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});

// main().catch((err) => //console.log(err));
app.use("/",basic);
app.use("/products",isAuth(),productsRouter.router);
app.use('/categories',isAuth(), categoriesRouter.router);
app.use('/brands', isAuth(),brandsRouter.router);
app.use('/users', isAuth(),usersRouter.router);
app.use('/auth', authRouter.router);
app.use('/cart', isAuth(),cartRouter.router);
app.use('/orders',isAuth(),ordersRouter.router);
app.use('/payment',razorPayment.router);
app.use('/reset',forgotpassword.router);
app.use('/send',isAuth(),sendInvoice.router);
//app.use('/',paymentRouter);
//app.use('/',checkPayment.router);

module.exports=app;
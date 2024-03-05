const express=require('express');
const app=express(); // creating an instance
const passport = require('./config/passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const isAuth=require('./middleware/auth').isAuth;
//const paymentRouter=require("./config/payment");
app.use(express.json()); //req response format
app.use(express.static('build'));
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
const stripe = require("stripe")('sk_test_51Ol7OkSFOvFxVpY9ie7lKzfXpyPzT5dFnu0HXk6gq12M6BV2jZTaIxp9CwUqQwJshC0xrnBeEn3ofNnNBMtyhtes00UvtHhMjY');


app.post("/create-payment-intent", async (req, res) => {
 // //console.log("stripe---------",stripe);
  const { totalAmount } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount*100, // for decimal compensation
    currency: "inr",
    name:'jenny rosen',
    address:{
      line1:"g10townsend st",
      postal_code:'98140',
      city:"san fransisco",
      state:"CA",
      country:"US"
    },
    automatic_payment_methods: {
      enabled: true,
    },
  });
////console.log("paymentIntent!!----",paymentIntent);
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Webhook

// TODO: we will capture actual order after deploying out server live on public URL

const endpointSecret = "whsec_515f37c2410ffd2a57174ba2e371050968b425f65e3110bf79c302e533edaea0 ";

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      ////console.log({paymentIntentSucceeded})
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
     // //console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
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
app.use('/',forgotpassword.router);
app.use('/',isAuth(),sendInvoice.router);
//app.use('/',paymentRouter);
//app.use('/',checkPayment.router);

module.exports=app;
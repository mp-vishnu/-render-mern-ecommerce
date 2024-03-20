const stripe=require("stripe")("sk_test_51Ol7OkSFOvFxVpY9ie7lKzfXpyPzT5dFnu0HXk6gq12M6BV2jZTaIxp9CwUqQwJshC0xrnBeEn3ofNnNBMtyhtes00UvtHhMjY");
  
  exports.checkPayment = async (req, res) => {
  
    const {totalAmount,totalItems}=req.body;
    //console.log("inside checkPayment---",totalAmount);

    const lineItems= [
      {
          price_data: {
              currency: "usd",
              product_data: {
                  name: "Total Amount",
              },
              unit_amount: totalAmount * 100,
          },
          quantity: totalItems,
      }]
     
    const session=await stripe.checkout.sessions.create({  
        payment_method_types:["card"],
        line_items:lineItems,
        mode:'payment',
        success_url:"http://localhost:3000/success",
        cancel_url:"http://localhost:3000/cancel",
    });
    // const session = await stripe.customers.create({
    //   name: 'Jenny Rosen',
    //   address: {
    //     line1: '510 Townsend St',
    //     postal_code: '98140',
    //     city: 'San Francisco',
    //     state: 'CA',
    //     country: 'US',
    //   },
    // });
    res.json({id:session.id});
  };
  
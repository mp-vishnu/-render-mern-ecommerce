import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from 'react-redux';

import CheckoutForm from "./CheckoutForm";
import "../Stripe.css";
import { selectCurrentOrder } from "../features/order/orderSlice";

export default function StripeCheckout() {
 // const [clientSecret, setClientSecret] = useState("");
  const currentOrder = useSelector(selectCurrentOrder)

  const makePayment=async()=>{
    const stripe=await loadStripe("pk_test_51Ol7OkSFOvFxVpY926O5rioEFGpMPJwdQUtwtewKdpzYuusA3fod5bWTzhae5zICmsL6oUk7yaSYmRLdATX8ulmM00f7Ir3K6Z");
    const body={ totalAmount: currentOrder.totalAmount }
    const headers={
        "Content-Type":"application/json"
    }
        const response = await fetch("http://localhost:8080/create-payment-intent",{
            method:"POST",
            headers:headers,
            body:JSON.stringify(body)
        });

        const session =await response.json();

        const result=stripe.redirectToCheckout({
            sessionId:session.id
        });
        if(result.error){
            //console.log(result.error);
        }
    }

    
  
  useEffect(() => {
    //console.log("---currentOrder---",currentOrder);
   makePayment();
  }, []);

//   const appearance = {
//     theme: 'stripe',
//   };
//   const options = {
//     clientSecret,
//     appearance,
//   };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
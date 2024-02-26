import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentOrder } from '../features/order/orderSlice';

function PaymentPage() {
  const currentOrder = useSelector(selectCurrentOrder);

  const navigate = useNavigate();

  const initPayment = (data) => {
    const options = {
      key: 'rzp_test_YajafUP0r1GoV7',
      amount: data.amount,
      currency: data.currency,
      description: 'Test Transaction',
      order_id: data.id,
      handler: async (res) => {
        try {
          const verifyUrl = 'http://localhost:8080/payment/verify';
          const response = await fetch(verifyUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(res),
          });
          const responseData = await response.json();
          console.log('data!!!!!!', responseData);
          // Redirect to success page on successful payment
          navigate(`/order-success/${currentOrder.id}`); // Replace "/success" with the path to your custom success page
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: '#3399cc',
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  useEffect(() => {
    const handlePayment = async () => {
      try {
        const orderUrl = 'http://localhost:8080/payment/orders';
        const response = await fetch(orderUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: currentOrder.totalAmount }),
        });
        const data = await response.json();
        console.log('data-payment/orders', data);
        initPayment(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    handlePayment();
  }, [currentOrder.totalAmount, navigate]);

  return null;
}

export default PaymentPage;

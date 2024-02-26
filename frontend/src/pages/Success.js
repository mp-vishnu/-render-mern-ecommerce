import React,{ useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Success = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("moving__!!!");
      // Navigate to the root page after 4 seconds
      navigate('/', { replace: true });
    }, 4000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-500">Payment Successful</h1>
        <p className="mt-4 text-lg">Your order will be dispatched soon.</p>
      </div>
    </div>
  );
};

export default Success;

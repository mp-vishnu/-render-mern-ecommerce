import React from 'react'
import './App.css';
import {  BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailPage from './pages/ProductDetailPage';
import Pagination from './features/product/components/Pagination';
import Protected from './features/auth/components/Protected';
import UserOrdersPage from './pages/UserOrderPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import PageNotFound from './pages/404';
import UserProfilePage from './pages/UserProfilePage';
import { checkAuthAsync, selectLoggedInUser, selectUserChecked } from './features/auth/authSlice';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminHome from './pages/AdminHome';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import { positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import StripeCheckout from './pages/StripeCheckout';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFail from './pages/PaymentFail';
const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT,
};
function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked=useSelector(selectUserChecked);

  useEffect(()=>{
    dispatch(checkAuthAsync())
  },[dispatch])

  useEffect(()=>{
    console.log("--app user--");
    if(user){
      console.log("--app user--",user);
      dispatch(fetchItemsByUserIdAsync())
      dispatch(fetchLoggedInUserAsync())
    }
  },[dispatch, user])
  return (
   <>
  {userChecked &&   <Provider template={AlertTemplate} {...options}>
     <Router>

  <>
     <Routes>
    <Route path="/" exact element={ <Protected><Home /></Protected>} />
    <Route exact path="/admin" element={  <ProtectedAdmin><AdminHome></AdminHome></ProtectedAdmin>} />
    <Route exact path="/login" element={  <LoginPage/>} />
    <Route exact path="/signup" element={  <SignupPage/>} />
    <Route exact path="/cart" element={  <Protected><CartPage/></Protected>} />
    <Route exact path="/checkout" element={  <Protected><Checkout/></Protected>} />
    <Route exact path="/product-detail/:id" element={   <Protected><ProductDetailPage/></Protected>} />
    <Route exact path="/admin/product-detail/:id" element={ <ProtectedAdmin><AdminProductDetailPage></AdminProductDetailPage></ProtectedAdmin>} />
    <Route exact path="/admin/product-form" element={   <ProtectedAdmin><AdminProductFormPage></AdminProductFormPage></ProtectedAdmin>} />
    <Route exact path="/admin/orders" element={   <ProtectedAdmin><AdminOrdersPage></AdminOrdersPage></ProtectedAdmin>} />
    <Route exact path="/admin/product-form/edit/:id" element={   <ProtectedAdmin><AdminProductFormPage></AdminProductFormPage></ProtectedAdmin>} />
    <Route exact path="/pagination" element={  <Pagination/>} />
    <Route exact path="/order-success/:id" element={  <Protected><OrderSuccessPage/></Protected>} />
    <Route exact path="/orders" element={     <Protected><UserOrdersPage/></Protected>} />
    <Route exact path="/profile" element={ <Protected> <UserProfilePage/></Protected>} />
    <Route exact path="/stripe-checkout/" element={  <Protected> <StripeCheckout/></Protected>} />
    <Route exact path="/logout" element={  <Logout/>} />
    <Route exact path="/forgot-password" element={  <ForgotPasswordPage/>} />
    <Route exact path="/success" element={  <PaymentSuccess/>} />
    <Route exact path="/cancel" element={  <PaymentFail/>} />
    <Route exact path="*" element={  <PageNotFound/>} />
    </Routes>
  </>
    </Router>
    </Provider>}
   </>
  );
}

export default App;

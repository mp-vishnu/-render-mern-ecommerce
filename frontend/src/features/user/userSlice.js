import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchLoggedInUserOrders,
  updateUser,
  fetchLoggedInUser,
  sendMail,
  resetPassword
} from './userAPI';

const initialState = {
  status: 'idle',
  userInfo: null,
  loaded:false
  // this info will be used in case of detailed user info, while auth will
  // only be used for loggedInUser id etc checks
};

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async (id) => {
    const response = await fetchLoggedInUserOrders();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async () => {
    const response = await fetchLoggedInUser();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
    // this is name mistake
    const response = await updateUser(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const  sendMailAsync = createAsyncThunk(
  'user/sendMail',
  async (data) => {
    try {
      const response = await sendMail(data);
      return response.data;
    } catch (error) {
      //console.log(error);
      return error;
    }
  }
);

export const  resetPasswordAsync= createAsyncThunk(
  'user/sendMail',
  async (data) => {
    //console.log("dsts inside resetasync ",data)
    try {
      const response = await resetPassword(data);
      return response.data;
    } catch (error) {
      //console.log(error);
      return error;
    }
  }
);


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo.orders = action.payload;
     
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // earlier there was loggedInUser variable in other slice
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // this info can be different or more from logged-in User info
        state.userInfo = action.payload;
        state.loaded=true;
      })
      .addCase(sendMailAsync.fulfilled, (state, action) => {
       //console.log("fullfilled sendMailAsync payload");
      })
  },
});

// TODO: change orders and address to be independent of user;
export const selectUserOrders = (state) => state.user.userInfo.orders;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserInfoStatus = (state) => state.user.status;
export const selectLoaded=(state)=>state.user.loaded;


export default userSlice.reducer;
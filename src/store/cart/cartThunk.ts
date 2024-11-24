import {createAsyncThunk} from '@reduxjs/toolkit';
import {axiosInstance} from '../../api/index';
import {isAxiosError} from 'axios';

export const getCarts = createAsyncThunk('cart/getCarts', async (_, thunkAPI) => {
  const res = await axiosInstance.get('/cart');

  if (isAxiosError(res)) {
    return thunkAPI.rejectWithValue("Unknown error occurred.");
  }

  return res.data;
});

export const changeTaskStatus = createAsyncThunk('cart/changeTaskStatus',
  async ({taskId, status}: {taskId: number, status: boolean}, thunkAPI) => {
  const res = await axiosInstance.patch(`/cart/change-done-status/${taskId}`, {status});

  if (isAxiosError(res)) {
    return thunkAPI.rejectWithValue("Unknown error occurred.");
  }

  return res.data;
})


export const deleteCart = createAsyncThunk('cart/deleteCart', async (id, thunkAPI) => {
  const res = await axiosInstance.delete(`cart/${id}`);

  if (isAxiosError(res)) {
    return thunkAPI.rejectWithValue("Unknown error occurred.");
  }

  return {data: res.data, id};
})

export const createCart = createAsyncThunk('cart/createCart', async (data: {name: string}, thunkAPI) => {
  const res = await axiosInstance.post('/cart', data);

  if (isAxiosError(res)) {
    return thunkAPI.rejectWithValue("Unknown error occurred.");
  }

  return res.data;
});

export const editCart = createAsyncThunk('cart/editCart', async (data: {name: string, id: number}, thunkAPI) => {
  const res = await axiosInstance.patch(`/cart/rename/${data.id}`, data);

  if (isAxiosError(res)) {
    return thunkAPI.rejectWithValue("Unknown error occurred.");
  }

  return res.data;
})

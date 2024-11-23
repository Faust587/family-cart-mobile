import {createAsyncThunk} from '@reduxjs/toolkit';
import {axiosInstance} from '../../api';
import {AxiosResponse, isAxiosError} from 'axios';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';


export type TLoginPayload = {email: string, password: string};

export type TLoginResponse = {
  user: TUser;
  accessToken: string;
}
export type TUser = {
  id: number;
  name: string;
  email: string;
  password: string;
}


export const login = createAsyncThunk(`auth/login`, async (arg: TLoginPayload, thunkAPI) => {
  const {email, password} = arg;

  const res: AxiosResponse<TLoginResponse, {message: string}> =
    await axiosInstance.post('/auth/sign-in', {email, password});

  if (isAxiosError(res)) {
    return thunkAPI.rejectWithValue(res.data as unknown as {message: string});
  }

  await SecureStoragePlugin.set({ key: 'accessToken', value: res.data.accessToken });

  return res.data as TLoginResponse;
})

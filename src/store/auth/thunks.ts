import { createAsyncThunk } from '@reduxjs/toolkit';

import api from '../../api';
import {
  Payload,
  RegisterError,
  RegisterErrorNew,
  SignInValues,
  SignUpValues,
  UserSelf,
} from '../../types/allTypes';

export const fetchGetUser = createAsyncThunk<UserSelf>('auth/getUser', async () => {
  const userData = await api.get('/users/self');
  return userData.data;
});

export const fetchSignIn = createAsyncThunk<string | undefined, Payload<SignInValues>>(
  'auth/signIn',
  async ({ values }, { rejectWithValue, dispatch }) => {
    try {
      const { userName, password } = values;

      const tokens = await api.post('/auth/login', {
        username: userName,
        password: password,
      });

      const { accessToken, refreshToken } = tokens.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      await dispatch(fetchGetUser());
    } catch (error) {
      console.log('Error:', error);
      return rejectWithValue((error as RegisterError).message);
    }
  },
);

export const fetchSignUp = createAsyncThunk<
  string | undefined,
  Payload<SignUpValues>,
  { rejectValue: { message: string } }
>('auth/signUp', async ({ values }, { rejectWithValue, dispatch }) => {
  try {
    const { userName, password, fullName } = values;

    await api.post('/auth/register', {
      username: userName,
      password: password,
      displayName: fullName,
    });

    await dispatch(fetchSignIn({ values }));
  } catch (error) {
    return rejectWithValue({
      message: (error as RegisterErrorNew).response.data.message,
    });
  }
});

export const fetchLogOut = createAsyncThunk('auth/logOut', async () => {
  await api.get('/auth/logout');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
});

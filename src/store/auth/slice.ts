import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { InitialState, UserSelf } from '../../types/allTypes';
import { fetchGetUser, fetchSignUp } from './thunks';

const initialState: InitialState = {
  user: {
    admin: false,
    displayName: '',
    id: 0,
    username: '',
  },
  isUserLoading: true,
  error: '',
};

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    clearUser: (state: InitialState) => {
      state.user = initialState.user;
      state.isUserLoading = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetUser.pending, (state: InitialState) => {
      state.isUserLoading = true;
    });
    builder.addCase(
      fetchGetUser.fulfilled,
      (state: InitialState, action: PayloadAction<UserSelf>) => {
        state.user = action.payload;
        state.isUserLoading = false;
      },
    );
    builder.addCase(fetchGetUser.rejected, (state: InitialState) => {
      state.isUserLoading = false;
    });
    builder.addCase(fetchSignUp.rejected, (state: InitialState, action) => {
      state.isUserLoading = false;
      state.error = action.payload?.message || '';
    });
    builder.addCase(fetchSignUp.pending, (state: InitialState) => {
      state.error = '';
    });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;

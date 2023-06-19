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
  isUserLoaded: true,
  error: '',
};

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    clearUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetUser.pending, (state: InitialState) => {
      state.isUserLoaded = true;
    });
    builder.addCase(
      fetchGetUser.fulfilled,
      (state: InitialState, action: PayloadAction<UserSelf>) => {
        state.user = action.payload;
        state.isUserLoaded = false;
      },
    );
    builder.addCase(fetchGetUser.rejected, (state: InitialState) => {
      state.isUserLoaded = false;
    });
    builder.addCase(fetchSignUp.rejected, (state: InitialState, action) => {
      state.isUserLoaded = false;
      state.error = action.payload?.message || '';
    });
    builder.addCase(fetchSignUp.pending, (state: InitialState) => {
      state.error = '';
    });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;

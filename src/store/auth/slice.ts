import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { InitialState, UserSelf } from '../../types/allTypes';
import { fetchGetUser } from './thunks';

const initialState: InitialState = {
  user: {
    admin: false,
    displayName: '',
    id: 0,
    username: '',
  },
  isUserLoaded: false,
};

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    clearUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchGetUser.fulfilled,
      (state: InitialState, action: PayloadAction<UserSelf>) => {
        state.user = action.payload;
        state.isUserLoaded = true;
      },
    );
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;

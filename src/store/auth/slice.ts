import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { UserSelf } from '../../types/allTypes';
import { fetchGetUser } from './thunks';

const initialState: UserSelf = {
  admin: false,
  displayName: '',
  id: 0,
  username: '',
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
      (state: UserSelf, action: PayloadAction<UserSelf>) => {
        state.admin = action.payload.admin;
        state.displayName = action.payload.displayName;
        state.id = action.payload.id;
        state.username = action.payload.username;
      },
    );
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;

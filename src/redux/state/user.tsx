import { createSlice } from '@reduxjs/toolkit';
import { UserInfo } from '../../models/user.model';
import { clearLocalStorage, persistLocalStorage } from '../../utils/localStorage.utility';

export const EmptyUserState: UserInfo = {
  _id: null,
  name: '',
  email: ''
};

export const UserKey = 'user';

export const userSlice = createSlice({
  name: 'user',
  initialState: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : EmptyUserState,
  reducers: {
    createUser: (_, action) => {
      persistLocalStorage<UserInfo>(UserKey, action.payload);

      return action.payload;
    },
    updateUser: (state, action) => {
      const result = { ...state, ...action.payload };
      persistLocalStorage<UserInfo>(UserKey, result);
      return result;
    },
    resetUser: () => {
      clearLocalStorage(UserKey);
      return EmptyUserState;
    }
  }
});

export const { createUser, updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
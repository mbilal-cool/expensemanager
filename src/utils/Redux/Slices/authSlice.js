import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.data;
      // console.log('userLogged', state.user);
    },
    clearUser: (state, action) => {
      state.user = {};
    },
  },
});

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;

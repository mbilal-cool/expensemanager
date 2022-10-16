import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://reqres.in/api/users?delay=1');
  return await response.json();
});

const initialState = {
  users: [],
  loading: false,
};

const userReducer = createSlice({
  name: 'users',
  initialState,

  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      console.log('paload', action.payload.data);
      state.users = action.payload.data;
      state.loading = false;
    });
    builder.addCase(fetchUsers.rejected, state => {
      state.loading = false;
    });
  },
});

export default userReducer.reducer;

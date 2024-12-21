import {createSlice} from '@reduxjs/toolkit';
import {getCountriesCode} from '../actions/authActions';
import {ChatTypes} from '../../models/data/chats/chats';

const initialState: ChatTypes = {};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCountriesCode.pending, state => {
        state.pendingCountriesCode = true;
      })
      .addCase(getCountriesCode.fulfilled, (state, action) => {
        state.pendingCountriesCode = false;
        state.countries = action.payload;
      })
      .addCase(getCountriesCode.rejected, state => {
        state.pendingCountriesCode = false;
      });
  },
});

export const {} = chatSlice.actions;
export default chatSlice.reducer;

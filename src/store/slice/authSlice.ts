import {createSlice} from '@reduxjs/toolkit';
import {CountriesType} from '../../models/data/auth/auth';
import {getCountriesCode} from '../actions/authActions';
import PhoneNumber from '../../screens/profile/phoneNumber';

const initialState: CountriesType = {
  phoneNumber: '',
  countries: [],
  pendingCountriesCode: false,
  name: '',
  surname: '',
  selectCountry: {
    id: 1,
    code: '+90',
    country: 'Türkiye',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCountry: (state, action) => {
      state.selectCountry = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setSurname: (state, action) => {
      state.surname = action.payload;
    },
  },
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

export const {setCountry, setPhoneNumber, setName, setSurname} =
  authSlice.actions;
export default authSlice.reducer;

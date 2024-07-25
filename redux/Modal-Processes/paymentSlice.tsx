import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface PaymentState {
  isBankAccount: boolean;
  isMobileMoney: boolean;
  isOnionPay: boolean;
}

// Define the initial state using that type
const initialState: PaymentState = {
  isBankAccount: false,
  isMobileMoney: false,
  isOnionPay: false,
};

export const paymentSlice = createSlice({
  name: "payment",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setBankAccount: (state, action) => {
      state.isBankAccount = action.payload;
      console.log(action.payload);
    },
    setMobileMoney: (state, action) => {
      state.isMobileMoney = action.payload;

      // console.log(action.payload)
    },
    setOnionPay: (state, action) => {
      state.isOnionPay = action.payload;
      console.log(state.isOnionPay);
    },
  },
});

export const { setBankAccount, setMobileMoney, setOnionPay } =
  paymentSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPaymentMethod = (state: RootState) => state.payment;

export default paymentSlice.reducer;

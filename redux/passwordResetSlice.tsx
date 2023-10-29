import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
interface PasswordResetState {
	email: string;
	resetPassBoolean: boolean;
}

// Define the initial state using that type
const initialState: PasswordResetState = {
	email: "",
	resetPassBoolean: false,
};

export const passwordResetSlice = createSlice({
	name: "email",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		setMyEmail: (state, action) => {
			state.email = action.payload;
		},
		setResetPassBoolean: (state, action) => {
			state.resetPassBoolean = action.payload;
		},
	},
});

export const { setMyEmail, setResetPassBoolean } = passwordResetSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectEmail = (state: RootState) => state.email;

export default passwordResetSlice.reducer;

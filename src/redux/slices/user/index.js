import userSlice from './slice';
export const userSliceReducer = userSlice.reducer;
export const {setIsLoggedIn,setUserMeta,setToken,setPassword} = userSlice.actions;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectUserMeta = (state) => state.user.userMeta;
export const selectUserPassword = (state) => state.user.password;
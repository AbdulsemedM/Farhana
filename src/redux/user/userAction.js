import userService from "../service/user.service";
import { userActionTypes } from "./userType";

export const setToken = (item) => ({
  type: userActionTypes.SET_TOKEN,
  payload: item,
});

export const setUserProfile = (item) => ({
  type: userActionTypes.SET_USER_PROFILE,
  payload: item,
});

export const setRole = (item) => ({
  type: userActionTypes.ROLE,
  payload: item,
});
export const getUserData = () => async (dispatch) => {
  try {
    dispatch({
      type: userActionTypes.FETCH_START,
      payload: true,
    });
    const unionData = await userService.fetchUser();
    dispatch({
      type: userActionTypes.GET_USER,
      payload: unionData,
    });
  } catch (error) {
    dispatch({
      type: userActionTypes.GET_USER_ERROR,
      payload: error,
    });
  }
};
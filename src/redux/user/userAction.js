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
export const getUserData = (access_token) => async (dispatch) => {
  try {
    dispatch({
      type: userActionTypes.FETCH_START,
      payload: true,
    });
    const userData = await userService.fetchUser(access_token);
    dispatch({
      type: userActionTypes.GET_USER,
      payload: userData,
    });
  } catch (error) {
    dispatch({
      type: userActionTypes.GET_USER_ERROR,
      payload: error,
    });
  }
};
export const getOrphanData = (access_token) => async (dispatch) => {
  try {
    dispatch({
      type: userActionTypes.FETCH_START,
      payload: true,
    });
    const orphanData = await userService.fetchOrphan(access_token);
    dispatch({
      type: userActionTypes.GET_ORPHAN,
      payload: orphanData,
    });
  } catch (error) {
    dispatch({
      type: userActionTypes.GET_ORPHAN_ERROR,
      payload: error,
    });
  }
};
export const getMessageData = (access_token) => async (dispatch) => {
  try {
    dispatch({
      type: userActionTypes.FETCH_START,
      payload: true,
    });
    const orphanData = await userService.fetchMessage(access_token);
    dispatch({
      type: userActionTypes.GET_MESSAGE,
      payload: orphanData,
    });
  } catch (error) {
    dispatch({
      type: userActionTypes.GET_MESSAGE_ERROR,
      payload: error,
    });
  }
};

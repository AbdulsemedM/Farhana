import { userActionTypes } from "./userType";

const INITIAL_STATE = {
  access_token: null,
  role: null,
  userProfile: {},
  user: [],
  loading: false,
  orphan: [],
  message: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.SET_TOKEN:
      return {
        ...state,
        access_token: action.payload,
      };
    case userActionTypes.ROLE:
      return {
        ...state,
        role: action.payload,
      };

    case userActionTypes.SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
      };
    case userActionTypes.FETCH_START:
      return {
        ...state,
        loading: action.payload,
      };
    case userActionTypes.GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case userActionTypes.GET_USER_ERROR:
      return {
        ...state,
        user: [],
        loading: false,
      };
    case userActionTypes.GET_ORPHAN:
      return {
        ...state,
        orphan: action.payload,
        loading: false,
      };
    case userActionTypes.GET_ORPHAN_ERROR:
      return {
        ...state,
        orphan: [],
        loading: false,
      };
    case userActionTypes.GET_MESSAGE:
      return {
        ...state,
        message: action.payload,
        loading: false,
      };
    case userActionTypes.GET_MESSAGE_ERROR:
      return {
        ...state,
        message: [],
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;

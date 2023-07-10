import { userActionTypes } from "./userType";

const INITIAL_STATE = {
  access_token: null,
  role: null,
  userProfile: {},
  user: [],
  loading: false,
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
    case userActionTypes.GET_UNION:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case userActionTypes.GET_UNION_ERROR:
      return {
        ...state,
        user: [],
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;

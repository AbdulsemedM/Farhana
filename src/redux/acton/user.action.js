import { userActionTypes } from "../user/userType";

export const getUnionData = () => async (dispatch) => {
    try {
      dispatch({
        type: userActionTypes.FETCH_START,
        payload: true,
      });
      const unionData = await UnionAndPCService.fetchUnion();
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
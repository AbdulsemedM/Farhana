import { createSelector } from "reselect";

const selectData = (state) => state.user;

export const selectAccessToken = createSelector(
  [selectData],
  (user) => user.access_token
);

export const selectRole = createSelector([selectData], (user) => user.roles[0]);

export const selectUserProfile = createSelector(
  [selectData],
  (user) => user.userProfile
);

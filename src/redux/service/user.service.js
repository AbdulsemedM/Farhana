import { API } from "../../utils/API";

// const createUser = async (data, access_token) => {
//   await API.post(`auth/signup?access_token=${access_token}`, data).then(
//     (res) => res
//   );
// };
const fetchUser = async (access_token) => {
  return await API.get(`/users/getAllUsers`, {
    headers: {
      access_token: access_token,
    },
  }).then((res) => res.data);
};
const fetchOrphan = async (access_token) => {
  return await API.get(`/orphan/getAllOrphans`, {
    headers: {
      access_token: access_token,
    },
  }).then((res) => res.data);
};
const userService = {
  fetchUser,
  fetchOrphan,
};

// const mapStateToProps = createStructuredSelector({
//   access_token: selectAccessToken,
// });

export default userService;

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
const fetchMessage = async (access_token) => {
  return await API.get(`/message/getAllMessages`, {
    headers: {
      access_token: access_token,
    },
  }).then((res) => res.data);
};
const userService = {
  fetchUser,
  fetchOrphan,
  fetchMessage,
};

// const mapStateToProps = createStructuredSelector({
//   access_token: selectAccessToken,
// });

export default userService;

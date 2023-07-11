import { API } from "../../utils/API";

const createUser = async (data, access_token) => {
  await API.post(`auth/signup?access_token=${access_token}`, data).then(
    (res) => res
  );
};
const fetchUser = async (access_token) => {
  return await API.get(`/users/findAll?access_token=${access_token}`).then(
    (res) => res.data
  );
};
const userService = {
  fetchUser,
  createUser,
};

export default userService;

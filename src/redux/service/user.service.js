import { API } from "../../utils/API";

const createUser = async (data) => {
  await API.post("/union/add", data).then((res) => res);
};
const fetchUser = async () => {
  return await API.get("/union/getUnions").then((res) => res.data);
};
const userService = {
  fetchUser,
  createUser,
};
export default userService;

import { updatePassword } from "./User/changePassword.js";
import { deleteUser } from "./User/delete.js";
import { reactive } from "./User/reactivate.js";
import { getAllUsers } from "./User/read.js";
import { getUserDetails } from "./User/readOne.js";
import { updateUser } from "./User/update.js";

const userController = {
  read: getAllUsers,
  update: updateUser,
  delete: deleteUser,
  readOne: getUserDetails,
  changePassword: updatePassword,
  reactivate: reactive,
};

export { userController };

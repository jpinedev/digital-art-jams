import UserProfile from "./userProfile";
import UserReference from "./userReference";

interface User extends UserReference, UserProfile {
  _id: string;
  joinDate: string;
  submissions: number;
}
export default User;

export const UnregisteredUser: User = {
  _id: "UNREGISTERED",
  joinDate: new Date(Date.UTC(0,0)).toISOString(),
  username: "UNREGISTERED",
  displayName: "Unregistered User",
  profileImg: "",
  bio: "",
  admin: false,
  hideSubmissionsFromDefaultUser: false,
  hideBioFromDefaultUser: false,
  submissions: 0
};
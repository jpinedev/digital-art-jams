import UserSubmission from "../image/userSubmission";
import UserProfile from "./userProfile";
import UserReference from "./userReference";

interface User extends UserReference, UserProfile {
  registered: boolean;
  joinDate: string;

  submissions: UserSubmission[];
}
export default User;

export const UnregisteredUser: User = {
  registered: false,
  joinDate: new Date(Date.UTC(0,0)).toISOString(),
  submissions: [],
  id: "UNREGISTERED",
  displayName: "Unregistered User",
  profileImg: "",
  bio: "",
  admin: false,
  hideSubmissionsFromDefaultUser: false,
  hideBioFromDefaultUser: false
};
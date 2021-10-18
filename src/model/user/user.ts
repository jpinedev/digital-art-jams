import UserSubmission from "../image/userSubmission";
import UserProfile from "./userProfile";
import UserReference from "./userReference";

interface User extends UserReference, UserProfile {
  registered: boolean;
  joinDate: Date | undefined;

  submissions: UserSubmission[];
}
export default User;

export const UnregisteredUser: User = {
  registered: false,
  joinDate: undefined,
  submissions: [],
  id: "UNREGISTERED",
  displayName: "Unregistered User",
  profileImg: "",
  bio: "",
  admin: false,
  hideSubmissionsFromDefaultUser: false,
  hideBioFromDefaultUser: false
};
import UserReference from "./userReference";

interface UserProfile extends UserReference{
  bio: string;

  // User Privacy Preferences
  hideBioFromDefaultUser: boolean;
}
export default UserProfile;
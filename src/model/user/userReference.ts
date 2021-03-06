interface UserReference {
  username: string;
  displayName: string;
  profileImg: string;
  
  admin: boolean;

  // User Privacy Preferences
  hideSubmissionsFromDefaultUser: boolean;
}
export default UserReference;
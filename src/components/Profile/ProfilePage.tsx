import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { UnregisteredUser } from "../../model/user/user";
import { usersMap } from "../../reducers/mock-data/users";
import ProfileComponent from "./ProfileComponent";

interface ProfileParams {
  id: string
}

const ProfilePage = () => {
  const {id} = useParams<ProfileParams>();
  const [user, setUser] = useState(UnregisteredUser);

  useEffect(() => {
    setUser(usersMap[id]);
  }, [id, user, setUser]);
  
  return (
    <ProfileComponent user={user}/>
  );
};
export default ProfilePage;

import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import User from "../../model/user/user";
import { imagesUserMap } from "../../reducers/mock-data/images";
import ProfileImage from "./ProfileImage";

interface ProfileComponentProps {
  user: User;
  canEdit?: boolean;
}

const ProfileComponent = ({ user, canEdit = false }: ProfileComponentProps) => {
  const registered = useAppSelector(state => state.auth).registered;

  return (
    <div className="card">
      <div className="card-head border-bottom">
        { canEdit && 
          <div className="position-absolute end-0 m-lg-5 m-3">
            <Link to="/profile/edit" className="btn btn-secondary">Edit</Link>
          </div>
        }
        <div className="d-flex flex-wrap p-lg-5 pb-lg-3 p-3 pb-0">
          
          <div className="col-md-auto col-12 me-md-3 mb-3">
            <ProfileImage src={user.profileImg}/>
          </div>
          <div className="col-md-9 col-12 position-relative mb-3">
            <div className="d-md-block d-none position-absolute bottom-0">
              <div className="h4 mb-0">{user.displayName}</div>
              <div className="text-muted">@{user.id}</div>
            </div>
            <div className="d-md-none">
              <div className="h4 mb-0">{user.displayName}</div>
              <div className="text-muted">@{user.id}</div>
            </div>
          </div>
          <div className="col-md-8 col-12 mb-3">
            <p className="h5 mb-1">Bio</p>
            <p className="mb-0">
              {user.hideBioFromDefaultUser && !registered ? `${user.displayName}'s bio is private to anonymous users.` : user.bio}
            </p>
          </div>
          <div className="col-md-4 col-12 mb-3">
            <p className="h5 mb-1">Stats</p>
            <p className="mb-0">Joined {new Date(user.joinDate).toLocaleDateString()}</p>
            <p className="mb-0">{imagesUserMap[user.id]?.length || '0'} Submission{imagesUserMap[user.id]?.length !== 1 ? 's':''}</p>
          </div>
        </div>
      </div>
      <div className="card-body">
        
      </div>
    </div>
  );
};
export default ProfileComponent;

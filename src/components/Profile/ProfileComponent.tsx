import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import User from "../../model/user/user";
import ImageCard from "../ImageCard";
import ProfileImage from "./ProfileImage";
import { Submissions } from "../../reducers/imagesReducer";
import imagesAction from "../../actions/imagesAction";
import usersAction from "../../actions/usersAction";

interface ProfileComponentProps {
  user: User;
  canEdit?: boolean;
}

const ProfileComponent = ({ user, canEdit = false }: ProfileComponentProps) => {
  const registered = useAppSelector(state => state.authStatus);

  const dispatch = useAppDispatch();
  const userSubmissions = useAppSelector(state => state.imagesByGallery);
  const [submissions, setSubmissions] = useState<Submissions>([]);

  const adminStatus = useAppSelector(state => state.adminStatus);

  const promoteToAdmin = () => 
    usersAction.promoteUser(dispatch, user);

  useEffect(() => {
    if (!!userSubmissions[user.username])
      setSubmissions(userSubmissions[user.username]);
    else
      imagesAction.getImagesByUser(dispatch, user.username)
        .then(setSubmissions);
  }, [user.username, dispatch, userSubmissions]);
  
  return (
    <div className="card">
      <div className="card-head border-bottom">
        <div className="position-absolute end-0 m-lg-5 m-3">
          { adminStatus && !user.admin &&
            <button className="btn btn-primary" onClick={promoteToAdmin}>Promote to Admin</button>
          }
          { canEdit && 
            <Link to="/profile/edit" className="btn btn-secondary">Edit</Link>
          }
        </div>
        
        <div className="d-flex flex-wrap p-lg-5 pb-lg-3 p-3 pb-0">
          
          <div className="col-md-auto col-12 me-md-3 mb-3">
            <ProfileImage src={user.profileImg}/>
          </div>
          <div className="col-md-9 col-12 position-relative mb-3">
            <div className="d-md-block d-none position-absolute bottom-0">
              <div className="h4 mb-0">{user.displayName}</div>
              <div className="text-muted">@{user.username}{ user.admin &&
                <span className="fa-stack fa-sm text-primary">
                  <i className="fas fa-certificate fa-stack-2x"></i>
                  <i className="fas fa-pen-fancy fa-stack-1x fa-inverse"></i>
                </span>
              }</div>
            </div>
            <div className="d-md-none">
              <div className="h4 mb-0">{user.displayName}</div>
              <div className="text-muted">@{user.username}{ user.admin &&
                <span className="fa-stack fa-sm text-primary">
                  <i className="fas fa-certificate fa-stack-2x"></i>
                  <i className="fas fa-pen-fancy fa-stack-1x fa-inverse"></i>
                </span>
              }</div>
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
            <p className="mb-0">{user.submissions} Submission{user.submissions !== 1 ? 's':''}</p>
          </div>
        </div>
      </div>
      <div className="card-body">
        { user.hideSubmissionsFromDefaultUser && !registered ?
          <div className="text-center">{user.displayName}'s artworks are private to anonymous users.</div>
          :
          (submissions.length === 0 ?
            <div className="text-center">{user.displayName} does not have any submissions.</div>
            :
            <div className="row row-cols-lg-4 row-cols-md-3 row-cols-2 p-3 g-2">
              {
                submissions?.map(image => 
                  <div key={image.id} className="col">
                    <ImageCard image={image} user={user}/>
                  </div>)
              }
            </div>
          )
        }
      </div>
    </div>
  );
};
export default ProfileComponent;

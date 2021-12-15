import React, { ChangeEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import usersService from "../../service/usersService";
import ProfileImage from "./ProfileImage";

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const profile = useAppSelector(state => state.authUser);
  const [edit, setEdit] = useState(profile);
  const updateField = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const fieldName = event.target.id;
    const newEdit: any = { ...edit };
    newEdit[fieldName] = event.target.value;
    setEdit(newEdit);
  };

  const toggleField = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const fieldName = event.target.id;
    const newEdit: any = { ...edit };
    newEdit[fieldName] = value;
    setEdit(newEdit);
  };

  const saveChanges = () =>
    usersService.updateUser(edit)
      .then(() => dispatch({
        type: 'update-user',
        user: edit
      }))
      .then(() => history.replace('/profile'))
      .catch(console.error);

  return (
    <div className="card">
      <div className="card-body position-relative p-lg-5 p-3">
        <div className="position-absolute end-0 me-lg-5 me-3">
          <Link to="#" className="btn btn-primary me-1" onClick={saveChanges}>Save</Link>
          <Link to="/profile" className="btn btn-secondary">Cancel</Link>
        </div>

        <div className="mb-3">
          <ProfileImage src={profile.profileImg}/>
        </div>

        <div className="text-muted mb-3">@{profile.username}</div>
        <div className="mb-3">
          <label htmlFor="displayName" className="form-label">Display Name</label>
          <input type="text" id="displayName" className="form-control"
            placeholder="John Doe"
            value={edit.displayName}
            onChange={updateField}/>
        </div>
        <div className="mb-3">
          <label htmlFor="bio" className="form-label">Bio</label>
          <textarea id="bio" className="form-control"
            placeholder="About you..."
            value={edit.bio}
            onChange={updateField}/>
        </div>

        <div className="mb-3">
          <label className="form-label">Stats</label>
          <p className="text-muted mb-0">Joined {new Date(profile.joinDate).toLocaleDateString()}</p>
          <p className="text-muted mb-0">{profile.submissions} Submission{profile.submissions !== 1 ? 's':''}</p>
        </div>

        <div className="">
          <label className="form-label">Privacy Settings</label>
          <div className="form-check">
            <label htmlFor="hideBioFromDefaultUser" className="form-check-label">Hide Bio from Anonymous Users</label>
            <input type="checkbox" id="hideBioFromDefaultUser" className="form-check-input"
              checked={edit.hideBioFromDefaultUser}
              onChange={toggleField}/>
          </div>
          <div className="form-check">
            <label htmlFor="hideSubmissionsFromDefaultUser" className="form-check-label">Hide Submissions from Anonymous Users</label>
            <input type="checkbox" id="hideSubmissionsFromDefaultUser" className="form-check-input"
              checked={edit.hideSubmissionsFromDefaultUser}
              onChange={toggleField}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
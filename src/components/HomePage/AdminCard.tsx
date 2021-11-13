import React from "react";
import { Link } from "react-router-dom";
import User from "../../model/user/user";
import { usersMap } from "../../reducers/mock-data/users";
import ProfileImage from "../Profile/ProfileImage";

interface AdminCardProps {
  admin: User;
  index?: number;
}

const AdminCard = ({ admin = usersMap['admin1'], index = 0}: AdminCardProps) => {
  return (
    <Link to={`/users/profile/${admin.id}`} className="col-md col-12 text-white text-decoration-none">
      <div className="text-center d-md-block d-none">
        <ProfileImage src={admin.profileImg} border={8} mxAuto={true} />
        <div className="h4 mt-2 mb-0">{admin.displayName}</div>
        <div className="">@{admin.id}</div>
      </div>
      <div className={`text-${index % 2 === 0 ? 'start':'end'} px-4 d-md-none d-flex ${index % 2 === 0 ? '':'flex-row-reverse'}`}>
        <ProfileImage src={admin.profileImg} border={8} />
        <div className="position-relative flex-grow-1">
          <div className={`position-absolute translate-middle-y top-50 ${index % 2 === 0 ? '':'end-0'} p-3`}>
            <div className="h4 mt-2 mb-0">{admin.displayName}</div>
            <div className="">@{admin.id}</div>
          </div>
        </div>
      </div>
    </Link>

  );
}

export default AdminCard;
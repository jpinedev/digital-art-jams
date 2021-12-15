import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import usersAction from "../../actions/usersAction";
import { useAppDispatch, useAppSelector } from "../../hooks";
import GalleryReference from "../../model/gallery/galleryReference";
import Image from "../../model/image/image";
import User from "../../model/user/user";
import ProfileImage from "../Profile/ProfileImage";

interface ImageProp {
  gallery: GalleryReference;
  image: Image;
}

const ImageDescriptor = ({ gallery, image }: ImageProp) => {
  const dispatch = useAppDispatch();
  const usersMap = useAppSelector(state => state.usersMap);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (!!usersMap[image.username])
      setUser(usersMap[image.username]);
    else 
      usersAction.getUser(dispatch, image.username)
        .then(setUser);
  }, [image.username, dispatch, usersMap]);

  return (
    <div className="primary">
      <div className="container d-flex p-4">
        <ProfileImage src={user?.profileImg} border={5}/>
        <div className="position-relative px-3 flex-grow-1">
          <p className="h1 mb-0">{image.title}</p>
          <p className="mb-0">by {user?.displayName}</p>
          <Link to={`/users/profile/${user?.username}`} className="btn btn-secondary bottom-0 position-absolute mb-2">View Profile</Link>
        </div>
        <div className="position-relative text-end d-md-block d-none">
          <p className="fw-bold mb-0">Submitted for {gallery.title}</p>
          <p className="mb-0">Submitted {new Date(image.date).toLocaleDateString()}</p>
          <Link to={`/jam/${gallery.id}`} className="btn btn-secondary bottom-0 end-0 position-absolute">View Jam</Link>
        </div>
      </div>
    </div>
  );
};

export default ImageDescriptor;
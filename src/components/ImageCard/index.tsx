import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import galleriesAction from "../../actions/galleriesAction";
import usersAction from "../../actions/usersAction";
import { useAppDispatch, useAppSelector } from "../../hooks";
import GalleryReference from "../../model/gallery/galleryReference";
import Image from "../../model/image/image";
import UserReference from "../../model/user/userReference";

interface ImageCardParameters {
  image: Image;
  gallery?: GalleryReference;
  user?: UserReference;
}

const ImageCard = ({image, gallery: _gallery, user: _user}: ImageCardParameters) => {
  const dispatch = useAppDispatch();
  const usersMap = useAppSelector(state => state.usersMap);
  const [user, setUser] = useState(_user);
  const galleriesMap = useAppSelector(state => state.galleriesMap);
  const [gallery, setGallery] = useState(_gallery);

  useEffect(() => {
    if (!!_gallery) {
      if (!!usersMap[image.username])
        setUser(usersMap[image.username]);
      else 
        usersAction.getUser(dispatch, image.username)
          .then(setUser);
    }
    else {
      if (!!galleriesMap[image.gallery])
        setGallery(galleriesMap[image.gallery]);
      else 
        galleriesAction.getGallery(dispatch, image.gallery)
          .then(setGallery);
    }
  }, [_gallery, usersMap, image.username, image.gallery, dispatch, galleriesMap]);

  return (
    <Link to={`/jam/${gallery?.id}/${image.id}`} className="card h-100 link-secondary">
      <img className="card-img-top" src={image.url} alt={`${image.username}'s submission'`} />
      <div className="card-body p-2 pt-1">
        <div className="fw-bold card-title mb-0">{image.title}</div>
        { !!_user &&
          <div className="card-text fa-sm">for {gallery?.title}</div>
        }
        { !!_gallery &&
          <div className="card-text fa-sm">by {user?.displayName}</div>
        }
      </div>
    </Link>
  );
};

export default ImageCard;
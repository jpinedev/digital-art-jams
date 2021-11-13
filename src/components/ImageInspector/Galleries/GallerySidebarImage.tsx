import React from "react";
import { Link } from "react-router-dom";
import ImageInfo from "../../../model/image/imageInfo";

interface GallerySidebarImageProps {
  activeId: string;
  imageInfo: ImageInfo;
  displayHorizontal: boolean;
}

const GallerySidebarImage = ({activeId, imageInfo, displayHorizontal}: GallerySidebarImageProps) => {
  const {id, title, url} = imageInfo;
  return (
    <Link to={`/image/${id}`} className={`position-relative ${displayHorizontal ? 'd-inline-block ms-2':'mt-3 w-100'}`}>
      { !displayHorizontal && <img className={`w-100 border border-white ${id === activeId ? 'active-border':''}`} src={url} alt={title} /> }
      { displayHorizontal && 
        <div className="position-relative image-container">
          <img className={`border border-white ${id === activeId ? 'active-border':''}`} src={url} alt={title} />
        </div>
      }
    </Link>
  );
};

export default GallerySidebarImage;
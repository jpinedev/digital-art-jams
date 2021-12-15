import React from "react";
import { Link } from "react-router-dom";
import Image from "../../model/image/image";

interface GallerySidebarImageProps {
  galleryId: string;
  activeId: string;
  image: Image;
  displayHorizontal: boolean;
}

const GallerySidebarImage = ({galleryId, activeId, image, displayHorizontal}: GallerySidebarImageProps) => {
  const {id, title, url} = image;
  return (
    <Link to={`/jam/${galleryId}/${id}`} className={`mt-3 ${displayHorizontal ? 'd-horizontal':'d-vertical'}`}>
      {/* <div className="position-relative image-container">
        <img className={`position-absolute top-50 translate-middle-y border border-white ${id === activeId ? 'active-border':''}`} src={url} alt={title} />
      </div> */}
      <img src={url} alt={title} className={`image-responsive border border-white ${id === activeId ? 'active-border':''}`} />
    </Link>
    // <Link to={`/image/${id}`} className={`position-relative ${displayHorizontal ? 'd-inline-block ms-2':'mt-3 w-100'}`}>
    //   { !displayHorizontal && <img className={`w-100 border border-white ${id === activeId ? 'active-border':''}`} src={url} alt={title} /> }
    //   { displayHorizontal && 
    //     <div className="position-relative image-container">
    //       <img className={`border border-white ${id === activeId ? 'active-border':''}`} src={url} alt={title} />
    //     </div>
    //   }
    // </Link>
  );
};

export default GallerySidebarImage;
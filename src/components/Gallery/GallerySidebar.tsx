import React from "react";
import { Link } from "react-router-dom";
import GalleryReference from "../../model/gallery/galleryReference";
import GallerySidebarImage from "./GallerySidebarImage";
import "./gallerySidebar.css";
import { Submissions } from "../../reducers/imagesReducer";

interface GalleryProps {
  gallery: GalleryReference;
  submissions: Submissions;
  imageId: string;
  displayHorizontal?: boolean;
}

const GallerySidebar = ({gallery, submissions, imageId, displayHorizontal = false}: GalleryProps) => {
  return (
    <div className={`primary position-relative d-flex flex-column ${displayHorizontal ? 'border-top border-secondary':'h-100'}`}>
      <Link to={`/jam/${gallery.id}`} className={`d-flex text-white ${displayHorizontal ? 'px-3 pt-2':'p-3 border-bottom border-secondary'}`}>
        <i className="fas fa-arrow-left fa-2x fa-pull-left"></i>
        <p className="h3 mb-0 text-center flex-grow-1">{gallery.title}</p>
      </Link>
      <div className={`pe-3 position-relative w-100 ${displayHorizontal ? 'fix-height':''}`}>
        <div className={`d-flex flex-nowrap overflow-scroll h-100 ${displayHorizontal ? 'ps-1 pt-2 pb-2':'ps-3 flex-column pb-3'}`}>
          { 
            submissions?.map(image => 
              <GallerySidebarImage key={image.id} galleryId={gallery.id} activeId={imageId} image={image} displayHorizontal={displayHorizontal}/>)
          }
        </div>
      </div>
    </div>
  );
};

export default GallerySidebar;
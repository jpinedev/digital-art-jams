import React from "react";
import { Link } from "react-router-dom";
import GalleryReference from "../../../model/gallery/galleryReference";
import { galleriesMap } from "../../../reducers/mock-data/galleries";
import { imagesGalleryMap } from "../../../reducers/mock-data/images";
import GallerySidebarImage from "./GallerySidebarImage";

interface GalleryProps {
  galleryReference: GalleryReference;
  imageId: string;
  displayHorizontal?: boolean;
}

const GallerySidebar = ({galleryReference, imageId, displayHorizontal = false}: GalleryProps) => {
  const gallery = galleriesMap[galleryReference.id];
  const images = imagesGalleryMap[galleryReference.id];
  return (
    <div className={`primary position-relative d-flex flex-column ${displayHorizontal ? 'border-top border-secondary':'h-100'} h-100`}>
      <Link to={`/jam/${gallery.id}`} className={`d-flex flex-grow-1 text-white ${displayHorizontal ? 'px-3 pt-2':'p-3 border-bottom border-secondary'}`}>
        <i className="fas fa-arrow-left fa-2x fa-pull-left"></i>
        <p className="h3 mb-0 text-center flex-grow-1">{gallery.title}</p>
      </Link>
      <div className={`pe-3 position-relative w-100 ${displayHorizontal ? '':'fix-height'}`}>
        <div className={`d-flex flex-nowrap overflow-scroll h-100 ${displayHorizontal ? 'ps-1 pt-2 pb-2':'ps-3 flex-column pb-3'}`}>
          {
            images.map(image => (<GallerySidebarImage activeId={imageId} imageInfo={image} displayHorizontal={displayHorizontal}/>))
          }
        </div>
      </div>
    </div>
  );
};

export default GallerySidebar;
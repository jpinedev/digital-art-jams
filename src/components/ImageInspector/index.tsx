import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { imagesArray, imagesIdMap } from "../../reducers/mock-data/images";
import GallerySidebar from "./Galleries/GallerySidebar";
import ImageDescriptor from "./ImageDescriptor";
import ImageView from "./ImageView";

import "./imageInspector.css";
import HamburgerNav from "../Navigation/HamburgerNav";

interface ImageInspectorParams {
  id: string
}

const ImageInspector = () => {
  const {id} = useParams<ImageInspectorParams>();
  const [image, setImage] = useState(imagesArray[0]);

  const [gallery, showGallery] = useState(true);
  const toggleGallery = () => showGallery(!gallery);
  const [description, showDescription] = useState(true);
  const toggleDescription = () => showDescription(!description);

  useEffect(() => {
    setImage(imagesIdMap[id]);
  }, [id, setImage]);

  return (
    <>
      <div className="row gx-0 w-100 h-100 position-fixed">
        <div className={`border-end border-secondary col-xl-2 col-md-3 h-100 ${gallery ? 'd-md-block':''} d-none position-relative`}>
          <GallerySidebar galleryReference={image.gallery} imageId={image.id}/>
        </div>
        <div className="col position-relative h-100 d-flex flex-column">
          <div className="flex-grow-1 position-relative">
            <button className="d-md-block d-none position-absolute top-0 start-0 m-2 btn btn-primary btn-primary-opacity p-2 rounded-circle"
              style={{zIndex: 5}}
              onClick={toggleGallery}>
              <i className={`fas fa-chevron-${gallery ? 'left':'right'} fa-fw`}></i>
            </button>
            <ImageView imageUrl={image.url}/>
            <button className="position-absolute bottom-0 end-0 m-2 btn btn-primary btn-primary-opacity p-2 rounded-circle"
              style={{zIndex: 5}}
              onClick={toggleDescription}>
              <i className={`fas fa-chevron-${description ? 'down':'up'} fa-fw`}></i>
            </button>
          </div>

          { description &&
            <>
              <div className="">
                <ImageDescriptor image={image}/>
              </div>
              <div className="d-md-none d-block position-relative">
                <GallerySidebar galleryReference={image.gallery} imageId={image.id} displayHorizontal={true}/>
              </div>
            </>
          }
        </div>
      </div>
      <div className="position-absolute end-0 p-2">
        <HamburgerNav displayClass="primary"/>
      </div>
    </>
  );
};

export default ImageInspector;
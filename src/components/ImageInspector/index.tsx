import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import GallerySidebar from "../Gallery/GallerySidebar";
import ImageDescriptor from "./ImageDescriptor";
import ImageView from "./ImageView";
import HamburgerNav from "../Navigation/HamburgerNav";
import GalleryReference from "../../model/gallery/galleryReference";
import Image from "../../model/image/image";
import imagesService from "../../service/imagesService";
import { Submissions } from "../../reducers/imagesReducer";

interface ImageInspectorParams {
  imageId: string
}

interface ImageInspectorProps {
  gallery: GalleryReference;
  submissions: Submissions;
}

const ImageInspector = ({gallery, submissions}: ImageInspectorProps) => {
  const id = useParams<ImageInspectorParams>().imageId;
  const [image, setImage] = useState<Image>({
    id: '',
    title: '',
    url: '',
    date: new Date().toISOString(),
    username: '',
    gallery: ''
  });

  const [showGallery, setShowGallery] = useState(true);
  const toggleGallery = () => setShowGallery(!showGallery);
  const [description, showDescription] = useState(true);
  const toggleDescription = () => showDescription(!description);

  const history = useHistory();

  useEffect(() => {
    imagesService.getImage(id)
      .then(setImage)
      .catch(() => history.replace(`/jam/${gallery.id}`));
  }, [id, history, gallery.id]);

  return (
    <>
      <div className="row gx-0 w-100 h-100 position-fixed">
        <div className={`border-end border-secondary col-xl-2 col-md-3 h-100 ${showGallery ? 'd-md-block':''} d-none position-relative`}>
          { !!image.id && <GallerySidebar gallery={gallery} submissions={submissions} imageId={image.id}/> }
        </div>
        <div className="col position-relative h-100 d-flex flex-column">
          <div className="flex-grow-1 position-relative">
            <button className="d-md-block d-none position-absolute top-0 start-0 m-2 btn btn-primary btn-primary-opacity p-2 rounded-circle z-10"
              onClick={toggleGallery}>
              <i className={`fas fa-chevron-${showGallery ? 'left':'right'} fa-fw`}></i>
            </button>
            { !!image.url && <ImageView imageUrl={image.url}/> }
            <button className="position-absolute bottom-0 end-0 m-2 btn btn-primary btn-primary-opacity p-2 rounded-circle z-10"
              onClick={toggleDescription}>
              <i className={`fas fa-chevron-${description ? 'down':'up'} fa-fw`}></i>
            </button>
          </div>

          { description &&
            <>
              <div className="">
                { !!image.id && <ImageDescriptor gallery={gallery} image={image}/> }
              </div>
              <div className="d-md-none d-block position-relative">
                {!!gallery && <GallerySidebar gallery={gallery} submissions={submissions} imageId={image.id} displayHorizontal={true}/>}
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
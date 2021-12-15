import GalleryReference from "./galleryReference";

interface Gallery extends GalleryReference {
  createDate: string;
  submissionOpenDate: string;
  submissionCloseDate: string;
}
export default Gallery;

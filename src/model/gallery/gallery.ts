import GallerySubmission from "../image/gallerySubmission";
import GalleryReference from "./galleryReference";

interface Gallery extends GalleryReference {
  createDate: Date;
  submissionOpenDate: Date;
  submissionCloseDate: Date;

  submissions: GallerySubmission[];
}
export default Gallery;

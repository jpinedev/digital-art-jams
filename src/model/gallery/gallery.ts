import GallerySubmission from "../image/gallerySubmission";
import GalleryReference from "./galleryReference";

interface Gallery extends GalleryReference {
  createDate: string;
  submissionOpenDate: string;
  submissionCloseDate: string;

  submissions: GallerySubmission[];
}
export default Gallery;

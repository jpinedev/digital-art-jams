import GalleryReference from "../gallery/galleryReference";
import ImageInfo from "./imageInfo";

interface UserSubmission extends ImageInfo {
  gallery: GalleryReference;
}
export default UserSubmission;

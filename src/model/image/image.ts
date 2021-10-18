import GallerySubmission from "./gallerySubmission";
import ImageInfo from "./imageInfo";
import UserSubmission from "./userSubmission";

interface Image extends ImageInfo, GallerySubmission, UserSubmission {
  
}
export default Image;

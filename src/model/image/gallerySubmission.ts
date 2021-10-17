import UserReference from "../user/userReference";
import ImageInfo from "./imageInfo";

interface GallerySubmission extends ImageInfo {
  user: UserReference;
}
export default GallerySubmission;

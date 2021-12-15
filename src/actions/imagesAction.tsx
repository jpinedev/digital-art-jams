import cloudinaryService from "../service/cloudinaryService";
import imagesService from "../service/imagesService";
import { AppDispatch } from "../store";

const getImagesByUser = (dispatch: AppDispatch, username: string) =>
  imagesService.getImagesByUser(username)
    .then(submissions => {
      dispatch({
        type: 'get-submissions-by-user',
        username
      });
      return submissions;
    });


const getImagesByGallery = (dispatch: AppDispatch, gallery: string) =>
  imagesService.getImagesByGallery(gallery)
    .then(submissions => {
      dispatch({
        type: 'get-submissions-by-gallery',
        gallery,
        submissions
      });
      return submissions;
    });

const postImageToGallery = (dispatch: AppDispatch, gallery: string, username: string, title: string, image: File) => {
  let imageObj = {
    id: '',
    url: '',
    gallery,
    username,
    title,
  };

  return cloudinaryService.uploadImage(image, gallery, username)
    .then((params) => {
      imageObj = {
        ...imageObj,
        ...params
      };
      return imagesService.postImage(imageObj)
        .then(() => {
          dispatch({
            type: 'add-submission',
            gallery,
            username,
            image: imageObj
          });
          return imageObj;
        });
    });
}

const imagesAction = {
  getImagesByUser,
  getImagesByGallery,
  postImageToGallery
};
export default imagesAction;
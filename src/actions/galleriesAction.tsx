import Gallery from "../model/gallery/gallery";
import galleriesService from "../service/galleriesService";
import { AppDispatch } from "../store";

export const getGalleries = (dispatch: AppDispatch) => 
  galleriesService.getGalleries()
    .then(galleries => {
      dispatch({
        type: 'get-galleries',
        galleries
      });
    });

export const getGallery = (dispatch: AppDispatch, gallery: string) => 
  galleriesService.getGallery(gallery)
    .then(gallery => {
      dispatch({
        type: 'get-gallery',
        id: gallery.id,
        gallery
      });
      return gallery;
    });

export const postGallery = (dispatch: AppDispatch, gallery: Gallery) =>
  galleriesService.postGallery(gallery)
    .then(() => dispatch({
      type: 'get-gallery',
      id: gallery.id,
      gallery
    }));

export const updateGallery = (dispatch: AppDispatch, gallery: Gallery) =>
  galleriesService.updateGallery(gallery)
    .then(() => dispatch({
      type: 'get-gallery',
      id: gallery.id,
      gallery
    }));

const galleriesAction = {
  getGalleries,
  getGallery,
  postGallery,
  updateGallery
};
export default galleriesAction;

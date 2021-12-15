import { AnyAction } from "@reduxjs/toolkit";
import Gallery from "../model/gallery/gallery";

type GalleriesMap = {[key: string]: Gallery};

const galleriesMap = (state: GalleriesMap = { }, action: AnyAction) => {
  switch (action.type) {
    case 'get-galleries': {
      let newState: GalleriesMap = { };
      action.galleries.forEach((gallery: Gallery) => newState[gallery.id] = gallery);
      return newState;
    }
    case 'get-gallery': {
      let newState = { ...state };
      newState[action.id] = action.gallery;
      return newState;
    }
    default:
      return state;
  }
};

const galleriesReducer = {
  galleriesMap
};
export default galleriesReducer;
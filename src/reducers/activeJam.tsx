import { AnyAction } from "@reduxjs/toolkit";
import Gallery from "../model/gallery/gallery";

const isActive = (gallery: Gallery) => {
  const now = Date.now();
  return (Date.parse(gallery.submissionOpenDate) <= now && now <= Date.parse(gallery.submissionCloseDate) ? gallery.id:'');
}

const activeJam = (state = '', action: AnyAction) => {
  switch (action.type) {
    case 'get-galleries':
      return action.galleries.reduce((activeJam: string, gallery: Gallery) => {
        if (!!activeJam) return activeJam;
        else return isActive(gallery);
      }, state);
    case 'get-gallery':
      if (state) return state;
      return isActive(action.gallery as Gallery);
    default:
      return state;
  }
};

export default activeJam;
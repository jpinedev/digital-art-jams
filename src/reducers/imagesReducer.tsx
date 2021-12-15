import { AnyAction } from "@reduxjs/toolkit";
import Image from "../model/image/image"

export type Submissions = Image[];

type SubmissionsMap = {[key: string]: Submissions};

const imagesByUser = (state: SubmissionsMap = { }, action: AnyAction) => {
  switch (action.type) {
    case 'get-submissions-by-user': {
      let newState = { ...state };
      newState[action.username] = action.submissions;
      return newState;
    }
    case 'add-submission': {
      let newState = { ...state };
      if (!state[action.username]) newState[action.username] = [ action.image ];
      else newState[action.username] = [ ...newState[action.username], action.image ];
      return newState;
    }
    default:
      return state;
  }
};

const imagesByGallery = (state: SubmissionsMap = { }, action: AnyAction) => {
  switch (action.type) {
    case 'get-submissions-by-gallery': {
      let newState = { ...state };
      newState[action.gallery] = action.submissions;
      return newState;
    }
    case 'add-submission': {
      let newState = { ...state };
      if (!state[action.gallery]) newState[action.gallery] = [ action.image ];
      else newState[action.gallery] = [ ...newState[action.gallery], action.image ];
      return newState;
    }
    default:
      return state;
  }
};

const imagesReducer = {
  imagesByUser,
  imagesByGallery
};
export default imagesReducer;
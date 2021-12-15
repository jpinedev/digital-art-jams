import Gallery from "../model/gallery/gallery";

const GALLERIES_URL = 'http://localhost:5000/api/galleries';

const getGalleries = () =>
  fetch(GALLERIES_URL, {
    method: 'GET',
    credentials: 'include',
    headers: { 'content-type': 'application/json' }
  }).then(res => res.json());

const getGallery = (gallery: string) =>
  fetch(`${GALLERIES_URL}/${gallery}`, {
    method: 'GET',
    credentials: 'include',
    headers: { 'content-type': 'application/json' }
  }).then(res => {
    if (res.status >= 400) throw new Error("Bad response from server");
    return res.json();
  });

const postGallery = (gallery: Gallery) =>
  fetch(GALLERIES_URL, {
    method: 'POST',
    credentials: 'include',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(gallery)
  });

const updateGallery = (gallery: Gallery) =>
  fetch(`${GALLERIES_URL}/${gallery.id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(gallery)
  });

const galleriesService = {
  getGalleries,
  getGallery,
  postGallery,
  updateGallery
};
export default galleriesService;
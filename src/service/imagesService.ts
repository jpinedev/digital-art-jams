const IMAGES_URL = 'http://localhost:5000/api/images';

const getImage = (id: string) =>
  fetch(`${IMAGES_URL}/${id}`, {
    method: 'GET',
    credentials: 'include',
    headers: { 'content-type': 'application/json' }
  }).then(res => res.json());

const getImagesByUser = (username: string) =>
  fetch(`${IMAGES_URL}/user/${username}`, {
    method: 'GET',
    credentials: 'include',
    headers: { 'content-type': 'application/json' }
  }).then(res => res.json());

const getImagesByGallery = (gallery: string) =>
  fetch(`${IMAGES_URL}/gallery/${gallery}`, {
    method: 'GET',
    credentials: 'include',
    headers: { 'content-type': 'application/json' }
  }).then(res => {
    if (res.status >= 400) throw new Error("Bad response from server");
    return res.json();
  });

const postImage = (image: any) =>
  fetch(`${IMAGES_URL}/upload/${image.gallery}`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(image)
  }).then(res => {
    if (res.status >= 400) throw new Error("Bad response from server");
    return res;
  });

const imagesService = {
  getImage,
  getImagesByUser,
  getImagesByGallery,
  postImage
};
export default imagesService;
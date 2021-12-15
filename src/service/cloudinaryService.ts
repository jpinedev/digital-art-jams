import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
  cloud_name: 'digital-art-jams', 
  // api_key: '531381172992831',
  // api_secret: 'ElSUMEvO37XvJ7GPVq8QtVqV9l8'
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET
});

const uploadImage = (file: File, gallery: string, username: string) => {
  const url = "https://api.cloudinary.com/v1_1/digital-art-jams/image/upload";
  
  const id = `${gallery}_${username}`;
  const tags = [`jam_${gallery}`, `user_${username}`];
  let data = new FormData();
  data.append('public_id', id);
  data.append('tags', tags.join(','));
  data.append('upload_preset', 'unsigned_preset');
  data.append('file', file);
  
  return fetch(url, {
    method: "POST",
    body: data
  }).then(res => res.json())
    .then(res => { return {id, url: res.url } });
}

const cloudinaryService = {
  uploadImage
};
export default cloudinaryService;
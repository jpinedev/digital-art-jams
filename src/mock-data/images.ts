import Image from "../model/image/image";

import { galleriesMap } from "./galleries";
import { usersMap } from "./users";

export const imagesGalleryMap: {[key: string]: Image[]} = {
  fallJam: [
    {
      id: "user1_fallJam_entry",
      title: "Autumnal Forest",
      url: "https://wallpaperaccess.com/full/2416944.png",
      date: new Date(Date.parse("2021-10-18T00:00:00")),
      user: usersMap.user1,
      gallery: galleriesMap.fallJam
    },
    {
      id: "admin1_fallJam_entry",
      title: "Autumnal Joy",
      url: "https://img2.goodfon.com/wallpaper/nbig/3/6a/devochka-anime-osen-listya.jpg",
      date: new Date(Date.parse("2021-10-19T00:00:00")),
      user: usersMap.admin1,
      gallery: galleriesMap.fallJam
    },
    {
      id: "user1_fallJam_entry",
      title: "Fall in New England",
      url: "https://pm1.narvii.com/6230/2f9960e3e3e2df304a63943ff31d3dde18002caa_hq.jpg",
      date: new Date(Date.parse("2021-10-20T00:00:00")),
      user: usersMap.jakepine,
      gallery: galleriesMap.fallJam
    }
  ],
  spookyJam: [
    {
      id: "admin1_spookyJam_entry",
      title: "Pumpkin Heads",
      url: "https://imgix.ranker.com/list_img_v2/912/2740912/original/anime-about-halloween",
      date: new Date(Date.parse("2021-10-25T00:00:00")),
      user: usersMap.admin1,
      gallery: galleriesMap.fallJam
    },
    {
      id: "user1_fallJam_entry",
      title: "Pokemon Fright-fest",
      url: "https://cdn.alfabetajuega.com/wp-content/uploads/2019/08/pokemon-disfraz-halloween.jpg",
      date: new Date(Date.parse("2021-10-31T00:00:00")),
      user: usersMap.jakepine,
      gallery: galleriesMap.fallJam
    }
  ]
};

export const imagesArray = Object.keys(imagesGalleryMap).map((key: string) => imagesGalleryMap[key]).flat();

export const imagesIds = imagesArray.map((img: Image) => img.id);

let imagesByUser: {[key: string]: Image[]} = {};
imagesArray.forEach((img: Image) => {
  if (!imagesByUser[img.user.id]) imagesByUser[img.user.id] = [];
  imagesByUser[img.user.id].push(img);
});
export const imagesUserMap = imagesByUser;
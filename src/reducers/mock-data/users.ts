import User from "../../model/user/user";

export const usersMap: {[key: string]: User} = {
  admin1: {
    registered: true,
    joinDate: "2021-10-17",
    submissions: [],
    id: "admin1",
    displayName: "Admin 1",
    profileImg: "https://pbs.twimg.com/profile_images/1215688870672515072/ry9ZejZF_400x400.jpg",
    bio: "Hi, I am one of the administrators of this site.",
    admin: true,
    hideSubmissionsFromDefaultUser: false,
    hideBioFromDefaultUser: false
  },
  admin2: {
    registered: true,
    joinDate: "2021-10-18",
    submissions: [],
    id: "admin2",
    displayName: "Admin 2",
    profileImg: "https://pbs.twimg.com/profile_images/1334185489344053249/cmMlhKxU_400x400.jpg",
    bio: "Hi, I am another of the administrators of this site.",
    admin: true,
    hideSubmissionsFromDefaultUser: false,
    hideBioFromDefaultUser: false
  },
  admin3: {
    registered: true,
    joinDate: "2021-10-19",
    submissions: [],
    id: "admin3",
    displayName: "Admin 3",
    profileImg: "https://64.media.tumblr.com/ed9d8bf8a602ed18120552272dc0a6fb/576d3e3da280b837-e5/s500x750/4d1380badc4e5b373763b8d7bd4191ffd4de9f66.jpg",
    bio: "Hi, I am the third of the administrators of this site.",
    admin: true,
    hideSubmissionsFromDefaultUser: false,
    hideBioFromDefaultUser: false
  },
  admin4: {
    registered: true,
    joinDate: "2021-10-20",
    submissions: [],
    id: "admin4",
    displayName: "Admin 4",
    profileImg: "https://64.media.tumblr.com/8569443b303dbf07d8067789fab25b44/6ac02a4bf0989e68-63/s400x600/4f4b85672893b4b5b7d2156209edc7552c3c496b.png",
    bio: "Hi, I am the final administrator of this site.",
    admin: true,
    hideSubmissionsFromDefaultUser: false,
    hideBioFromDefaultUser: false
  },
  user1: {
    registered: true,
    joinDate: "2021-10-31",
    submissions: [],
    id: "user1",
    displayName: "Normal User 1",
    profileImg: "https://sdl-stickershop.line.naver.jp/products/0/0/1/3002/android/stickers/695305.png",
    bio: "Hi, I am a member of this site.",
    admin: false,
    hideSubmissionsFromDefaultUser: false,
    hideBioFromDefaultUser: false
  },
  user2: {
    registered: true,
    joinDate: "2021-10-31",
    submissions: [],
    id: "user2",
    displayName: "Normal User 2",
    profileImg: "https://sdl-stickershop.line.naver.jp/products/0/0/1/3002/android/stickers/695305.png",
    bio: "Hi, I am a member of this site.",
    admin: false,
    hideSubmissionsFromDefaultUser: true,
    hideBioFromDefaultUser: false
  },
  user3: {
    registered: true,
    joinDate: "2021-10-31",
    submissions: [],
    id: "user3",
    displayName: "Normal User 3",
    profileImg: "https://sdl-stickershop.line.naver.jp/products/0/0/1/3002/android/stickers/695305.png",
    bio: "Hi, I am a member of this site.",
    admin: false,
    hideSubmissionsFromDefaultUser: false,
    hideBioFromDefaultUser: true
  },
  user4: {
    registered: true,
    joinDate: "2021-10-31",
    submissions: [],
    id: "user4",
    displayName: "Normal User 4",
    profileImg: "https://sdl-stickershop.line.naver.jp/products/0/0/1/3002/android/stickers/695305.png",
    bio: "Hi, I am a member of this site.",
    admin: false,
    hideSubmissionsFromDefaultUser: true,
    hideBioFromDefaultUser: true
  },
  jakepine: {
    registered: true,
    joinDate: "2021-10-15",
    submissions: [],
    id: "jakepine",
    displayName: "Jake Pine",
    profileImg: "https://sdl-stickershop.line.naver.jp/products/0/0/1/3002/android/stickers/695305.png",
    bio: "Hi, I am the creator of this site.",
    admin: false,
    hideSubmissionsFromDefaultUser: false,
    hideBioFromDefaultUser: false
  },
};

export const usersIds: string[] = Object.keys(usersMap);

export const usersArray: User[] = usersIds.map((key: string) => usersMap[key]);

export const adminArray: User[] = usersArray.filter(user => user.admin);
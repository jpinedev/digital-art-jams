import React, { CSSProperties } from "react";


const profileImgContainer = (size: number, border: number) => {
  return {
    width: size,
    height: size,
    overflow: 'hidden',
    borderWidth: border,
    borderStyle: 'solid'
  };
}

const profileImg: CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover'
};

const ProfileImage = (
  {
    src = "https://static.wikia.nocookie.net/swordartonline/images/7/7d/Kazuto.png",
    size = 128,
    border = 0,
    mxAuto = false
  }
) => {
  return (
    <div className={`border-white rounded-circle ${mxAuto?'mx-auto':''}`} style={profileImgContainer(size, border)}>
      <img src={src} alt="user profile" style={profileImg}/>
    </div>
  );
};
export default ProfileImage;
import React from "react";

interface ImageUrl {
  imageUrl: string;
}

const imageContainer = {
  "object-fit": "contain",
  "overflow": "hidden"
}

const ImageView = ({ imageUrl }: ImageUrl) => {
  return (
    <div className="h-100 p-3 secondary" style={imageContainer}>
      <div className="h-100 position-relative" style={{backgroundImage: `url(${imageUrl})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
        {/* <img className="h-100" src={imageUrl} alt="inspector view" /> */}
      </div>
    </div>
  );
};

export default ImageView;
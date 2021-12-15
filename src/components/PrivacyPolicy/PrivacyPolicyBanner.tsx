import React, { useState } from "react";
import { Link } from "react-router-dom";

const PrivacyPolicyBanner = () => {
  const [showBanner, setShowBanner] = useState(true);

  const close = () => setShowBanner(false);
  return (
    <div className="d-block position-fixed vw-100 bottom-0 secondary z-10 border-secondary border-top">
      { showBanner &&
        <div className="container py-2">
          <div className="d-flex w-100 justify-content-between">
            <Link to={"/privacy-policy"} className="h5 mb-0 link-primary text-decoration-none">Privacy Policy</Link>
            <button className="btn-close btn-close-white" onClick={close}></button>
          </div>
          <Link to={"/privacy-policy"} className="link-white text-decoration-none">
            By using this site, you agree to the privacy policy. To learn more about our use of cookies, click here.
          </Link>
        </div>
      }
    </div>
  );
};
export default PrivacyPolicyBanner;

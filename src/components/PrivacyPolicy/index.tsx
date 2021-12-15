import React from "react";
import { Link } from "react-router-dom";
import WebsiteHeader from "../WebsiteHeader";

const PrivacyPolicy = () => {
  return (
    <div className="container-fluid min-vh-100 primary">
      <WebsiteHeader pushContent={true}/>
      <div className="container">
        <div className="card">
          <div className="card-body p-lg-4 p-3">
            <h3 className="">DAJams Privacy Policy</h3>
            <hr />
            <div className="fw-bold">Cookies</div>
            <ul className="pb-3">
              <li>DAJams stores temporary cookies on your machine to differentiate your browsing session from other users.</li>
              <li>When logged in, these cookies point to your account and your authentication status.</li>
              <li>The sole purpose for these cookies are to keep the user logged in when refreshing the page or navigating back to the DAJams website.</li>
            </ul>
            
            <div className="fw-bold">User Information</div>
            <ul className="pb-3">
              <li>DAJams stores the following user information as provided when registering and editing a user's profile:</li>
              <ul>
                <li>Account Information (date joined)</li>
                <li>Login Information (username, password)</li>
                <li>Personal Information (display name, bio)</li>
              </ul>
              
              <li>DAJams stores the following information as provided when submitting artwork to a jam:</li>
              <ul>
                <li>Submission Date/Time</li>
                <li>Uploaded Photo</li>
                <li>Submission Title</li>
              </ul>
            </ul>

            <div className="fw-bold">Privacy Settings</div>
            <ul>
              <li>DAJams allows users to hide their bios from anonymous users.</li>
              <li>DAJams allows users to hide their submissions from anonymous users.</li>
              <li>Anonymous users will still be able to see how many submissions you have made.</li>
              <li>To edit your privacy settings, <Link to={'/profile/edit'}>click here</Link>.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PrivacyPolicy;
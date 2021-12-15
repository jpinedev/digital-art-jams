import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import User from "../../model/user/user";
import usersService from "../../service/usersService";
import { HamburgerNavOptions } from "../Navigation/HamburgerNav";
import WebsiteHeader from "../WebsiteHeader";
import AdminCard from "./AdminCard";
import PrivacyPolicyBanner from "../PrivacyPolicy/PrivacyPolicyBanner";
import "./homePage.css";

const HomePage = ({
  registered = false
}) => {
  const [admins, setAdmins] = useState<User[]>([]);

  useEffect(() => {
    usersService.getAdmins()
      .then(setAdmins);
  }, []);

  return (
    <div className="primary min-vh-100">
      <div className="position-relative z-10">
        <WebsiteHeader activeLink={HamburgerNavOptions.home} pushContent={true} />
      </div>
      <PrivacyPolicyBanner />
      <div className="position-relative min-h-100">
        <div className="container text-center">
          <h1 className="text-reset">
            <span>Welcome to </span>
            <span className="text-secondary"><span className="fw-bold">D</span><span className="fb-title">igital Art Jams</span></span>!
          </h1>
          <p className="my-4 mx-auto">
            <span className="d-block">Develop your artistic abilities by participating <br className="d-sm-none d-block" />in weekly art jams.</span>
            <span className="d-block">Find inspiration from the work of your peers.</span>
            <span className="d-block">Share your work, and build collaborative galleries.</span>
          </p>
          <Link to={'/active-jam'} className="btn btn-secondary rounded mb-5 p-3 px-4">Start Jammin!</Link>
          
          <div className="meet-the-team h4 mt-md-4 mb-md-5 mb-4">
            <hr />
            <span className="translate-middle p-2">Meet the Team</span>
          </div>
          <div className="row px-2 pb-3">
            {
              admins.map((admin, index) => <AdminCard key={admin.username} admin={admin} index={index} />)
            }
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
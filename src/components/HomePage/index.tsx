import React from "react";
import { Link } from "react-router-dom";
import HamburgerNav, { HamburgerNavOptions } from "../Navigation/HamburgerNav";

const HomePage = ({
  registered = false
}) => {
  return (
    <div className="primary vh-100">
      <div className="position-absolute w-100 p-2" style={{zIndex: 10}}>
        <div className="float-start">
          <h1>
            <i className="fas fa-pencil-alt fa-fw"></i>
            DAJams
          </h1>
        </div>
        <div className="float-end">
          <HamburgerNav active={HamburgerNavOptions.home} registered={registered}/>
        </div>
      </div>

      <div className="position-relative vh-100">
        <div className="position-absolute container text-center top-50 start-50 translate-middle d-md-block d-none">
          <h1 className="text-reset">
            <span>Welcome to </span>
            <span className="text-secondary"><span className="fw-bold">D</span><span className="fb-title">igital Art Jams</span></span>!
          </h1>
          <p className="my-4 mx-auto">
            <span className="d-block">Develop your artistic abilities by participating in weekly art jams.</span>
            <span className="d-block">Find inspiration from the work of your peers.</span>
            <span className="d-block">Share your work, and build collaborative galleries.</span>
          </p>
          <Link to="/active-jam" className="btn btn-secondary rounded mb-4 p-3 px-4">Start Jammin!</Link>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
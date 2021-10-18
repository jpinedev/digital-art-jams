import React, { useState } from "react";
import { Link } from "react-router-dom";

export enum HamburgerNavOptions {
  home = 0,
  activeJam,
  pastJams,
  profile,
  login_register
};

const HamburgerNav = ({
  active = HamburgerNavOptions.home,
  registered = false,
  hide = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFaded, setIsFaded] = useState(true);

  return (
    <div className="text-end"
      onMouseEnter={() => setIsFaded(false)}
      onMouseLeave={() => {
        setIsExpanded(false);
        setIsFaded(true);
      }}>
      
      { !isExpanded && (
        <a className={`menu-icon d-inline-block mt-1 p-1 ${hide && isFaded && 'opacity-25'}`}
          onClick={() => setIsExpanded(true)}>
          <i className="fas fa-bars fa-2x fa-fw"></i>
        </a>
      )}
      { isExpanded && (
        <div>
          <a className="menu-icon d-inline-block float-start mt-2 ms-1"
            onClick={() => setIsExpanded(false)}>
            <i className="fas fa-times fa-2x fa-fw"></i>
          </a>
          
          <div className="nav-list list-group float-end">
            <Link to="/" className={`list-group-item ${active === HamburgerNavOptions.home && 'active'}`}>
              <span className="d-md-inline d-none">Home</span>
              <i className="fas fa-home fa-fw ms-1"></i>
            </Link>
            <Link to="/active-jam" className={`list-group-item ${active === HamburgerNavOptions.activeJam && 'active'}`}>
              <span className="d-md-inline d-none">Active Jam</span>
              <i className="fas fa-stopwatch fa-fw ms-1"></i>
            </Link>
            <Link to="/browse-jams" className={`list-group-item ${active === HamburgerNavOptions.pastJams && 'active'}`}>
              <span className="d-md-inline d-none">Past Jams</span>
              <i className="fas fa-calendar-alt fa-fw ms-1"></i>
            </Link>
            { registered && (
              <Link to="/profile" className={`list-group-item ${active === HamburgerNavOptions.profile && 'active'}`}>
                <span className="d-md-inline d-none">Profile</span>
                <i className="fas fa-user fa-fw ms-1"></i>
              </Link>
            )}
            { !registered && (
              <Link to="/login" className={`list-group-item ${active === HamburgerNavOptions.login_register && 'active'}`}>
                <span className="d-md-inline d-none">Login/Register</span>
                <i className="fas fa-user fa-fw ms-1"></i>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>

  );
}
export default HamburgerNav;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import loginAction from "../../actions/loginAction";
import { useAppDispatch, useAppSelector } from "../../hooks";
import "./nav.css";

export enum HamburgerNavOptions {
  none = 0,
  home,
  activeJam,
  pastJams,
  profile,
  login_register
};

const HamburgerNav = ({
  active = HamburgerNavOptions.none,
  hide = false,
  displayClass = 'secondary'
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFaded, setIsFaded] = useState(true);
  const registered = useAppSelector(state => state.authStatus);
  const activeJam = useAppSelector(state => state.activeJam);

  const dispatch = useAppDispatch();
  const logout = () => loginAction.logout(dispatch);

  /* TODO: fix link colors for darker background */

  return (
    <div className={`text-end nav-${displayClass} z-10`}
      onMouseEnter={() => setIsFaded(false)}
      onMouseLeave={() => {
        // setIsExpanded(false);
        // setIsFaded(true);
      }}>
      
      { !isExpanded && (
        <button className={`btn btn-link menu-icon link-${displayClass} d-inline-block mt-1 p-1 ${hide && isFaded ? 'opacity-25':''}`}
          onClick={() => setIsExpanded(true)}>
          <i className="fas fa-bars fa-2x fa-fw"></i>
        </button>
      )}
      { isExpanded && (
        <div>
          <button className={`btn btn-link menu-icon link-${displayClass} d-inline-block float-start mt-2 ms-1`}
            onClick={() => setIsExpanded(false)}>
            <i className="fas fa-times fa-2x fa-fw"></i>
          </button>
          
          <div className="nav-list list-group float-end">
            <Link to="/" className={`list-group-item ${active === HamburgerNavOptions.home ? 'active':''}`}>
              <span className="d-md-inline d-none">Home</span>
              <i className="fas fa-home fa-fw ms-1"></i>
            </Link>
            { !!activeJam &&
              <Link to="/active-jam" className={`list-group-item ${active === HamburgerNavOptions.activeJam ? 'active':''}`}>
                <span className="d-md-inline d-none">Active Jam</span>
                <i className="fas fa-stopwatch fa-fw ms-1"></i>
              </Link>
            }
            <Link to="/browse-jams" className={`list-group-item ${active === HamburgerNavOptions.pastJams ? 'active':''}`}>
              <span className="d-md-inline d-none">Browse Jams</span>
              <i className="fas fa-calendar-alt fa-fw ms-1"></i>
            </Link>
            { registered && (
              <>
                <Link to="/profile" className={`list-group-item ${active === HamburgerNavOptions.profile ? 'active':''}`}>
                  <span className="d-md-inline d-none">Profile</span>
                  <i className="fas fa-user fa-fw ms-1"></i>
                </Link>
                <Link to="#" className={`list-group-item`} onClick={logout}>
                  <span className="d-md-inline d-none">Logout</span>
                  <i className="fas fa-user fa-fw ms-1"></i>
                </Link>
              </>
            )}
            { !registered && (
              <Link to="/login" className={`list-group-item ${active === HamburgerNavOptions.login_register ? 'active':''}`}>
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
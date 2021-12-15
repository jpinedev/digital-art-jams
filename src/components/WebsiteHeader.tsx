import React from "react";
import { Link } from "react-router-dom";
import HamburgerNav, { HamburgerNavOptions } from "./Navigation/HamburgerNav";

interface WebsiteHeaderProps {
  pushContent?: boolean;
  activeLink?: HamburgerNavOptions;
}

const WebsiteHeader = ({
  pushContent = false,
  activeLink = HamburgerNavOptions.none
}: WebsiteHeaderProps) => {
  return (
    <>
      <div className="position-absolute w-100 p-2 top-0 start-0">
        <div className="float-start">
          <Link to="/" className="text-decoration-none text-white z-10">
            <h1>
                <i className="fas fa-pencil-alt fa-fw"></i>
                DAJams
            </h1>
          </Link>
        </div>
        <div className="float-end">
          <HamburgerNav active={activeLink} />
        </div>
      </div>
      { pushContent &&
        <h1 className="p-2 invisible">
          <i className="fas fa-pencil-alt fa-fw"></i>
          DAJams
        </h1>
      }
    </>
  );
};

export default WebsiteHeader;
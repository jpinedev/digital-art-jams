import React from "react";
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
      <div className="position-absolute w-100 p-2" style={{zIndex: 10}}>
        <div className="float-start">
          <h1>
            <i className="fas fa-pencil-alt fa-fw"></i>
            DAJams
          </h1>
        </div>
        <div className="float-end">
          <HamburgerNav active={activeLink} />
        </div>
      </div>
      { pushContent &&
        <h1 className="p-2">
          <i className="fas fa-pencil-alt fa-fw"></i>
          DAJams
        </h1>
      }
    </>
  );
};

export default WebsiteHeader;
import React from "react";
import { Redirect } from "react-router";
import { useAppSelector } from "../../hooks";

const ActiveJamRedirect = () => {
  const activeJam = useAppSelector(state => state.activeJam);

  return (
    <Redirect to={!!activeJam ? `/jam/${activeJam}`:`/browse-jams`}/>
  );
}
export default ActiveJamRedirect;
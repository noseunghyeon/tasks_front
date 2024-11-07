import React from "react";
import Navibar from "../components/Navibar";
import Itempanel from "../components/Itempanel";

const index = () => {
  return (
    <div className="page-section">
      <Navibar menuIdx={1} />
      <Itempanel pageTitle="Completed Items" />
    </div>
  );
};

export default index;

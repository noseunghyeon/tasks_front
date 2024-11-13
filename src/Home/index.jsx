import React from "react";
import Navibar from "../components/Navibar";
import Itempanel from "../components/Itempanel";

const index = () => {
  return (
    <div className="page-section">
      <Navibar menuIdx={0} />
      <Itempanel pageTitle="All Items" filterCompleted="all" />
    </div>
  );
};

export default index;

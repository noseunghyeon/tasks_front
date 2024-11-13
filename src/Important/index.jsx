import React from "react";
import Navibar from "../components/Navibar";
import Itempanel from "./../components/Itempanel";

const index = () => {
  return (
    <div className="page-section">
      <Navibar menuIdx={3} />
      <Itempanel
        pageTitle="Important Items"
        filterCompleted="all"
        filterImportant={true}
      />
    </div>
  );
};

export default index;

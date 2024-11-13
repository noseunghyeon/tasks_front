import React from "react";
import Navibar from "../components/Navibar";
import Itempanel from "../components/Itempanel";

const index = () => {
  return (
    <div className="page-section">
      <Navibar menuIdx={2} />
      <Itempanel pageTitle="Incompleted Items" filterCompleted={false} />
    </div>
  );
};

export default index;

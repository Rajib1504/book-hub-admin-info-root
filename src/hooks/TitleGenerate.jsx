import React from "react";

const TitleGenerate = ({ title, subtitle }) => {
  return (
    <div className="p-4 text-left">
      <h1 className="text-2xl md:text-3xl font-bold pb-2">{title}</h1>
      <h3 className="font-semibold">{subtitle}</h3>
    </div>
  );
};

export default TitleGenerate;

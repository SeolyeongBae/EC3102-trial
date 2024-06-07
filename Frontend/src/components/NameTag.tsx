import React from "react";

interface NameTagProps {
  text: string;
}

const NameTag: React.FC<NameTagProps> = ({ text }) => {
  return (
    <p className={"text-lg p-2 rounded-lg shadow-md bg-slate-800 text-white"}>
      {text}
    </p>
  );
};

export default NameTag;

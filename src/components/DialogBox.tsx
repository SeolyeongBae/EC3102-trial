import React from "react";

interface DialogBoxProps {
  displayedText: string;
  speaker: string;
}

const DialogBox: React.FC<DialogBoxProps> = ({ displayedText, speaker }) => {
  return (
    <div className="text-xl dialog-box p-10 bg-slate-100 text-slate-800 rounded-lg shadow-md text-center ">
      <div className={`dialog-line ${speaker}`}>
        <strong>{speaker}: </strong>
        {displayedText}
      </div>
    </div>
  );
};

export default DialogBox;

import React from "react";

interface DialogBoxProps {
  displayedText: string;
  speaker: string;
}

const DialogBox: React.FC<DialogBoxProps> = ({ displayedText, speaker }) => {
  return (
    <div className=" text-xl dialog-box p-2 bg-white rounded-lg shadow-md h-48 text-center">
      <div className={`dialog-line ${speaker}`}>
        <strong>{speaker}: </strong>
        {displayedText}
      </div>
    </div>
  );
};

export default DialogBox;

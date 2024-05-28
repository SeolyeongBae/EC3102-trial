import React from "react";

interface DialogBoxProps {
  displayedText: string;
  speaker: string;
}

const DialogBox: React.FC<DialogBoxProps> = ({ displayedText, speaker }) => {
  return (
    <div className="dialog-box">
      <div className={`dialog-line ${speaker}`}>
        <strong>{speaker}: </strong>
        {displayedText}
      </div>
    </div>
  );
};

export default DialogBox;

import "./Heart.scss";

import React, { useEffect, useRef } from "react";

import Heart from "./Heart";
interface LifeHeartsProps {
  life: number;
  left: number;
  style?: React.CSSProperties;
}

const LifeHearts = ({ life, left }: LifeHeartsProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const buttonElement = buttonRef.current;

    if (buttonElement) {
      const focusTimeout = setTimeout(() => buttonElement.focus(), 100);
      const blurTimeout = setTimeout(() => buttonElement.blur(), 1000);
      return () => {
        clearTimeout(focusTimeout);
        clearTimeout(blurTimeout);
      };
    }
  }, [life]);

  return (
    <>
      <div className={"flex nowrap"}>
        {[...Array(life)].map((_, index) => (
          <Heart key={index} checked={index >= left} />
        ))}
      </div>
    </>
  );
};

export default LifeHearts;

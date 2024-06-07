import "./Heart.scss";

import React, { useEffect, useRef } from "react";

import Heart from "./Heart";
interface LifeHeartsProps {
  maximum: number;
  left: number;
  style?: React.CSSProperties;
}

const LifeHearts = ({ maximum, left }: LifeHeartsProps) => {
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
  }, [maximum]);

  return (
    <>
      <div className={"flex nowrap"}>
        {[...Array(maximum)].map((_, index) => (
          <Heart key={index} checked={index >= left} />
        ))}
      </div>
    </>
  );
};

export default LifeHearts;

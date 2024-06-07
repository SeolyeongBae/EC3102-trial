import React from "react";
interface HeaderProps {
  prosecutorLife: number;
  defenseLife: number;
}

const Header: React.FC<HeaderProps> = ({ prosecutorLife, defenseLife }) => {
  return (
    <header className="header">
      <h1>역전재판</h1>
      <div className="life">검사 라이프: {prosecutorLife}</div>
      <div className="life">변호사 라이프: {defenseLife}</div>
    </header>
  );
};
export default Header;

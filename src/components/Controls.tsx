import React, { useState } from "react";

interface ControlsProps {
  onInput: (input: string) => void;
  onLifeChange: (text: string) => void;
  currentTurn: string;
}

const Controls: React.FC<ControlsProps> = ({
  onInput,
  onLifeChange,
  currentTurn,
}) => {
  const [input, setInput] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    if (input.trim()) {
      onInput(input);
      setInput("");
    }
  };

  if (currentTurn === "검사") {
    return null;
  }

  return (
    <div className="controls">
      <button onClick={() => onLifeChange("이의있음")}>이의있음!</button>
      <button onClick={() => onLifeChange("받아랏")}>받아랏!</button>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="자유 입력"
      />
      <button onClick={handleSubmit}>보내기</button>
    </div>
  );
};

export default Controls;

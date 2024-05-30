import React, { useState } from "react";
import { Character } from "src/const";

interface ControlsProps {
  onInput: (input: string) => void;
  onTurnChange: (text: string) => void;
  currentTurn: string;
}

const Controls: React.FC<ControlsProps> = ({
  onInput,
  onTurnChange,
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

  if (currentTurn === Character.PROSECUTOR) {
    return null;
  }

  return (
    <div className="flex justify-center space-x-4 mt-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => onTurnChange("이의있음!")}
      >
        이의있음!
      </button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => onTurnChange("받아랏!")}
      >
        받아랏!
      </button>
      <input
        className="border border-gray-300 rounded py-2 px-4"
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="자유 입력"
      />
      <button
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSubmit}
      >
        보내기
      </button>
    </div>
  );
};

export default Controls;

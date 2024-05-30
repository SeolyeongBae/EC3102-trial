import React, { useEffect, useState } from "react";
import { Character } from "src/const";

interface ControlsProps {
  onInput: (input: string) => void;
  currentTurn: string;
}

const Controls: React.FC<ControlsProps> = ({ onInput, currentTurn }) => {
  const [input, setInput] = useState<string>("");
  const isDisabled = currentTurn === Character.PROSECUTOR || input.length === 0;

  useEffect(() => {
    if (currentTurn === Character.LAWYER) {
      setInput("");
    }
  }, [currentTurn]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    onInput(input);
  };

  return (
    <>
      <textarea
        placeholder="응답을 입력하세요"
        className="dialog-box p-2 bg-white rounded-lg shadow-md h-48 text-center bg-gray-100"
        onChange={handleInputChange}
        value={input}
      />
      <div className="flex justify-center space-x-4 mt-4">
        <button
          className={`mt-4 py-2 px-4 font-semibold rounded-lg shadow-md text-white ${
            isDisabled ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
          }`}
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          이의있음!
        </button>
        <button
          className={`mt-4 py-2 px-4 font-semibold rounded-lg shadow-md text-white ${
            isDisabled ? "bg-gray-400" : "bg-green-500 hover:bg-green-700"
          }`}
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          받아랏!
        </button>
        <button
          className={`mt-4 py-2 px-4 font-semibold rounded-lg shadow-md text-white ${
            isDisabled ? "bg-gray-400" : "bg-yellow-500 hover:bg-yellow-700"
          }`}
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          보내기
        </button>
      </div>
    </>
  );
};

export default Controls;

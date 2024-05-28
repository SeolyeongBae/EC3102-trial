import { useState, useEffect, useCallback } from "react";

import "./App.css";
import Controls from "./components/Controls";
import DialogBox from "./components/DialogBox";
import Header from "./components/Header";

const INITIAL_TEXT = "야";

function App() {
  const [turn, setTurn] = useState<string>("변호사");

  const [prosecutorLife, setProsecutorLife] = useState<number>(3);
  const [defenseLife, setDefenseLife] = useState<number>(3);
  const [gameOver, setGameOver] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState<string>(INITIAL_TEXT);
  const [fullText, setFullText] = useState<string>(INITIAL_TEXT);

  useEffect(() => {
    if (prosecutorLife === 0) {
      setGameOver("증인은 무죄가 되었습니다");
    } else if (defenseLife === 0) {
      setGameOver("증인은 유죄가 되었습니다");
    }
  }, [prosecutorLife, defenseLife]);

  useEffect(() => {
    if (fullText.length > 0 && displayedText !== fullText) {
      // 같지 않을떄만 출력
      let index = 0;

      const intervalId = setInterval(() => {
        setDisplayedText((prev) => `${prev}${fullText[index - 1]}`);
        index++;
        if (index >= fullText.length) {
          clearInterval(intervalId);
          setTimeout(() => {
            setTurn("변호사");
          }, 500);
        }
      }, 100);
      return () => clearInterval(intervalId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullText]);

  const handleInput = useCallback((input: string) => {
    setFullText(input);
    setDisplayedText("");
    setTurn("검사");
  }, []);

  const handleLifeChange = (text: string) => {
    console.log("text", text);

    setFullText(text);
    setDisplayedText("");
    setTurn("검사");
  };

  const handleRestart = () => {
    setTurn("검사");
    setProsecutorLife(3);
    setDefenseLife(3);
    setGameOver(null);
    setDisplayedText("");
    setFullText(INITIAL_TEXT);
  };

  if (gameOver) {
    return (
      <div className="App">
        <Header prosecutorLife={prosecutorLife} defenseLife={defenseLife} />
        <div className="game-over">
          {gameOver}
          <button onClick={handleRestart}>다시하기</button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Header prosecutorLife={prosecutorLife} defenseLife={defenseLife} />
      <DialogBox
        displayedText={displayedText}
        speaker={turn === "검사" ? "변호사" : "검사"}
      />
      <Controls
        onInput={handleInput}
        onLifeChange={handleLifeChange}
        currentTurn={turn}
      />
    </div>
  );
}

export default App;

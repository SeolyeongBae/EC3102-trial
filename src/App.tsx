import { useCallback, useEffect, useState } from "react";

import Judge from "./assets/judge.webp";
import Lawyer from "./assets/lawyer.webp";
import Prosecutor from "./assets/pro.png";
import Controls from "./components/Controls";
import DialogBox from "./components/DialogBox";
import LifeHearts from "./components/lifeHearts/LifeHearts";
import { Character } from "./const";

const INITIAL_TEXT = "안녕하세요. 재판을 시작하겠습니다.";

function App() {
  const [turn, setTurn] = useState<string>(Character.LAWYER);

  const [prosecutorLife, setProsecutorLife] = useState<number>(3);
  const [defenseLife, setDefenseLife] = useState<number>(3);

  const [displayedText, setDisplayedText] = useState<string>(INITIAL_TEXT);
  const [fullText, setFullText] = useState<string>(INITIAL_TEXT);

  useEffect(() => {
    if (prosecutorLife === 0) {
      alert("증인은 무죄가 되었습니다");
    } else if (defenseLife === 0) {
      alert("증인은 유죄가 되었습니다");
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
            setTurn(Character.LAWYER);
            setFullText("");
            setDisplayedText("안녕하세요, 검사입니다."); //서버에서 받아온 검사의 말
          }, 500);
        }
      }, 100);
      return () => clearInterval(intervalId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullText]);

  const handleInput = useCallback((input: string) => {
    setFullText(input); //서버에서 받아온 변호사의 말
    setDisplayedText(""); //타이핑 효과를 위해 displaytext는 비움
    setTurn(Character.PROSECUTOR);
  }, []);

  const handleTurnChange = (text: string) => {
    setFullText(text);
    setDisplayedText("");
    setTurn(Character.PROSECUTOR);
  };

  return (
    <div className={"flex flex-col w-full items-center px-10 bg-amber-50 pt-5"}>
      <div className={"flex w-full gap-4"}>
        <button className={"py-2 px-8 text-lg hover:bg-[rgba(0,0,0,0.1)]"}>
          <p>재판</p>
        </button>
        <button className={"py-2 px-8 text-lg hover:bg-[rgba(0,0,0,0.1)]"}>
          <p>사건 개요</p>
        </button>
      </div>

      <div className={"flex justify-center"}>
        <p className={"font-hakgyo italic text-4xl text-red-800"}>22있소!</p>
      </div>

      <div className={"grid grid-cols-3 w-full"}>
        <div className={"flex flex-col items-center relative"}>
          <p
            className={
              "absolute top-[-60px] text-lg bg-white p-2 rounded-lg shadow-md"
            }
          >
            YOU
          </p>
          <LifeHearts maximum={3} left={defenseLife} />
          <img
            src={Prosecutor}
            alt={"Lawyer"}
            width={"35%"}
            style={{
              transform: "scaleX(-1)",
            }}
          />
        </div>

        <div className={"flex justify-center items-start"}>
          <img src={Judge} alt={"Judge"} width={"40%"} />
        </div>

        <div className={"flex flex-col items-center"}>
          <LifeHearts maximum={3} left={prosecutorLife} />
          <img src={Lawyer} alt={"Lawyer"} width={"40%"} style={{}} />
        </div>
      </div>

      <div className={"flex flex-col w-full"}>
        <div className={"flex flex-col gap-2 "}>
          <DialogBox
            displayedText={displayedText}
            speaker={
              turn === Character.PROSECUTOR
                ? Character.LAWYER
                : Character.PROSECUTOR
            }
          />
        </div>

        <Controls
          onInput={handleInput}
          onTurnChange={handleTurnChange}
          currentTurn={turn}
        />
      </div>
    </div>
  );
}

export default App;

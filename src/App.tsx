import { useCallback, useEffect, useState } from "react";

import Judge from "./assets/judge.webp";
import Lawyer from "./assets/lawyer.webp";
import LifeHearts from "./components/lifeHearts/LifeHearts";
import Header from "./components/Header";
import DialogBox from "./components/DialogBox";
import Controls from "./components/Controls";

const INITIAL_TEXT = "안녕하세요. 재판을 시작하겠습니다.";

enum Character {
  JUDGE = "judge",
  LAWYER = "lawyer",
  PROSECUTOR = "prosecutor",
}

function App() {
  const [scripts, setScripts] = useState<
    {
      character: string;
      text: string;
    }[]
  >([
    {
      character: Character.JUDGE,
      text: "안녕하세요. 재판을 시작하겠습니다.",
    },
    {
      character: Character.LAWYER,
      text: "안녕하세요. 변호사 홍길동입니다.",
    },
    {
      character: Character.PROSECUTOR,
      text: "안녕하세요. 검사 김철수입니다.",
    },
  ]);

  const [turn, setTurn] = useState<string>("변호사");

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
            setTurn("변호사");
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
    setTurn("검사");
  }, []);

  const handleLifeChange = (text: string) => {
    setFullText(text);
    setDisplayedText("");
    setTurn("검사");
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
            src={Lawyer}
            alt={"Lawyer"}
            width={"40%"}
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
            speaker={turn === "검사" ? "변호사" : "검사"}
          />
        </div>

        <Controls
          onInput={handleInput}
          onLifeChange={handleLifeChange}
          currentTurn={turn}
        />
      </div>
    </div>
  );
}

export default App;

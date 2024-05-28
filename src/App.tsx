import { useState } from "react";

import Judge from "./assets/judge.webp";
import Lawyer from "./assets/lawyer.webp";
import LifeHearts from "./components/lifeHearts/LifeHearts";

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
        <div className={"flex flex-col items-center"}>
          <LifeHearts life={3} left={3} />
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

        <div className={"flex flex-col items-center relative"}>
          <p
            className={
              "absolute top-[-60px] text-lg bg-white p-2 rounded-lg shadow-md"
            }
          >
            YOU
          </p>
          <LifeHearts life={3} left={3} />
          <img src={Lawyer} alt={"Lawyer"} width={"40%"} style={{}} />
        </div>
      </div>

      <div className={"flex flex-col w-full"}>
        <div className={"flex flex-col gap-2"}>
          {scripts.map((script, index) => (
            <div
              key={index}
              className={
                "flex gap-2 " +
                (script.character === Character.JUDGE
                  ? "justify-center"
                  : script.character === Character.PROSECUTOR
                    ? "justify-start"
                    : "justify-end")
              }
            >
              <div
                className={
                  "p-2 bg-white rounded-lg shadow-md " +
                  (script.character === "judge" ? "bg-red-100" : "bg-blue-100")
                }
              >
                <p>{script.text}</p>
              </div>
            </div>
          ))}
        </div>

        <textarea />
      </div>
    </div>
  );
}

export default App;

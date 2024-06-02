import { useCallback, useEffect, useState } from "react";

import Judge from "./assets/judge.webp";
import Lawyer from "./assets/lawyer.webp";
import Prosecutor from "./assets/pro.png";
import Controls from "./components/Controls";
import DialogBox from "./components/DialogBox";
import EvidenceList from "./components/Evidancelist";
import LifeHearts from "./components/lifeHearts/LifeHearts";
import { Character } from "./const";
import { useQuery } from "@tanstack/react-query";

const INITIAL_TEXT = "안녕하세요. 재판을 시작하겠습니다.";

function App() {
  const [turn, setTurn] = useState<string>(Character.LAWYER);

  const [prosecutorLife, setProsecutorLife] = useState<number>(3);
  const [defenseLife, setDefenseLife] = useState<number>(3);

  const [displayedText, setDisplayedText] = useState<string>(INITIAL_TEXT); //검사의 말
  const [fullText, setFullText] = useState<string>(INITIAL_TEXT);
  const [showModal, setShowModal] = useState(false);

  const { data, error, refetch } = useQuery({
    queryKey: ["trialData"],
    queryFn: () =>
      fetch("https://computer-system-team-02.dev.mobilex.kr/api/v1/init").then(
        (res) => res.json(),
      ),
  });

  useEffect(() => {
    if (data) {
      setProsecutorLife(data.prosecutor_life);
      setDefenseLife(data.lawyer_life);
      setDisplayedText(data.description);
      setTurn(Character.LAWYER);
    }
  }, [data]);

  useEffect(() => {
    if (prosecutorLife === 0) {
      alert("증인은 무죄가 되었습니다");
    } else if (defenseLife === 0) {
      alert("증인은 유죄가 되었습니다");
    }
  }, [prosecutorLife, defenseLife]);

  useEffect(() => {
    setTimeout(() => {
      setDisplayedText("안녕하세요, 검사입니다."); //서버에서 받아온 검사의 말
      setTurn(() => Character.LAWYER);
    }, 500);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullText]);

  const handleInput = useCallback((input: string) => {
    if (input.length !== 0) {
      setFullText(input); //서버에서 받아온 변호사의 말
      setTurn(Character.PROSECUTOR);
    }
  }, []);

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  return (
    <div className={"flex flex-col w-full items-center px-10 bg-amber-50 pt-5"}>
      <div className={"flex w-full gap-4"}>
        <button className={"py-2 px-8 text-lg hover:bg-[rgba(0,0,0,0.1)]"}>
          <p>재판</p>
        </button>
        <button
          className={"py-2 px-8 text-lg hover:bg-[rgba(0,0,0,0.1)]"}
          onClick={() => setShowModal(true)}
        >
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
        <div className={"flex flex-col gap-2"}>
          <DialogBox
            displayedText={displayedText}
            speaker={Character.PROSECUTOR}
          />
        </div>

        <Controls onInput={handleInput} currentTurn={turn} />
      </div>
      {showModal ? (
        <>
          <div
            id="modal-background"
            className="fixed inset-0 flex items-center justify-center z-50"
            onClick={handleClose}
          >
            <div
              className="bg-white rounded-lg shadow-lg p-8 w-1/2"
              onClick={(e) => e.stopPropagation()}
            >
              <h1 className="text-xl font-bold mb-4">사건 개요</h1>
              <p className="mb-4 text-lg ">
                2024년 5월 15일 밤, GIST(광주과학기술원) EECS(전자공학 및
                컴퓨터공학) 서버실에서 서버실 에어컨이 강제 종료되는 사건이
                발생했습니다. 이로 인해 서버 과열로 중요한 연구 데이터가
                손상되었습니다. 사건 당시, 서버실은 대학원생 박모 씨가
                마지막으로 사용한 것으로 확인되었습니다. 박모 씨는 교수님의
                과도한 업무 지시로 인해 밤 늦게까지 업무를 수행하던 중이었으며,
                에어컨을 끄고 서버실을 떠났다는 의심을 받고 있습니다.
              </p>
              <EvidenceList />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                창 닫기
              </button>
            </div>
          </div>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
        </>
      ) : null}
    </div>
  );
}

export default App;

import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

import {
  fetchJudgeScript,
  fetchLawyerScript,
  fetchProsecutorScript,
} from "./apis";
import Judge from "./assets/judge.webp";
import Lawyer from "./assets/lawyer.webp";
import Prosecutor from "./assets/pro.png";
import Controls from "./components/Controls";
import DialogBox from "./components/DialogBox";
import EvidenceList from "./components/Evidancelist";
import LifeHearts from "./components/lifeHearts/LifeHearts";
import NameTag from "./components/NameTag";
import { Character } from "./const";
import { useTrialData } from "./hooks";

const INITIAL_TEXT = "안녕하세요. 재판을 시작하겠습니다.";

interface IMutationParams {
  trial_id: string;
  speech: string;
}

function App() {
  const [turn, setTurn] = useState<string>(Character.LAWYER);

  const [prosecutorLife, setProsecutorLife] = useState<number>(3);
  const [defenseLife, setDefenseLife] = useState<number>(3);

  const [displayedText, setDisplayedText] = useState<string>(INITIAL_TEXT); //검사의 말
  const [fullText, setFullText] = useState<string>(INITIAL_TEXT);
  const [showModal, setShowModal] = useState(false);
  const [trialId, setTrialId] = useState<string | null>(null); // trial_id 상태 추가

  const { data, error, refetch } = useQuery({
    queryKey: ["trialData"],
    queryFn: () =>
      fetch("/api/init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
    enabled: false, // 처음에는 비활성화, 버튼 클릭 시 활성화
  });

  const {
    data: trialData,
    error: trialError,
    isLoading: isTrialLoading,
    refetch: refetchTrial,
  } = useTrialData(trialId ?? "");

  const prosecutorMutation = useMutation({
    mutationFn: (trial_id: string) => fetchProsecutorScript(trial_id),
    onSuccess: (data) => {
      if (data.scripts && data.scripts.length > 0) {
        //data.scripts에서 뒤에서부터 찾다가 role이 prosecutor 인거만 찾아줘
        const prosecutorScript = data.scripts
          .slice()
          .reverse()
          .find((script: any) => script.role === "prosecutor");

        if (prosecutorScript) {
          setDisplayedText(prosecutorScript.text);
          setTurn(() => Character.LAWYER);
        }
      }
    },
  });

  const judgeMutation = useMutation({
    mutationFn: (trial_id: string) => fetchJudgeScript(trial_id),
    onSuccess: (data) => {
      if (data.scripts && data.scripts.length > 0) {
        //data.scripts에서 뒤에서부터 찾다가 role이 prosecutor 인거만 찾아줘
        const judgeScript = data.scripts
          .slice()
          .reverse()
          .find((script: any) => script.role === "judge");

        if (judgeScript) {
          setDisplayedText(judgeScript.text);
        }
        getTrialData();
      }
    },
  });

  const lawyerMutation = useMutation({
    mutationFn: ({ trial_id, speech }: IMutationParams) =>
      fetchLawyerScript(trial_id, speech),
    onSuccess: (data) => {
      if (data.scripts && data.scripts.length > 0) {
        setTurn(Character.JUDGE); // 턴 넘겨줌
        judgeMutation.mutate(trialId ?? "");
      }
    },
  });

  useEffect(() => {
    if (data) {
      //초기 데이터라는 뜻
      setTrialId(data.trial_id); // trial_id 저장
      getTrialData();
      setTurn(Character.PROSECUTOR);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (trialData) {
      setProsecutorLife(trialData.prosecutor_life);
      setDefenseLife(trialData.lawyer_life);

      if (trialData.prosecutor_life === 0) {
        alert("증인은 무죄가 되었습니다");
        setTrialId(null);
      } else if (trialData.lawyer_life === 0) {
        alert("증인은 유죄가 되었습니다");
        setTrialId(null);
      }
    }
  }, [trialData]);

  useEffect(() => {
    if (
      turn === Character.PROSECUTOR &&
      trialId &&
      !prosecutorMutation.isPending
    ) {
      prosecutorMutation.mutate(trialId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn, trialId]);

  const handleInput = useCallback(
    (input: string) => {
      if (input.length !== 0) {
        setFullText(input); //변호사가 한 말을 저장, 서버로 보냄
        lawyerMutation.mutate({ trial_id: trialId ?? "", speech: input });
      }
    },
    [lawyerMutation, trialId],
  );

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
    getTrialData();
  };

  const getTrialData = () => {
    refetchTrial();
  };

  const continueTrial = () => {
    setTurn(Character.PROSECUTOR);
  };

  //전체 화면의 배경색을 꽉차게 하고 싶어

  return (
    <div
      className={
        "flex flex-col w-full h-screen items-center px-10 bg-amber-50 pt-5"
      }
    >
      <div className={"flex w-full gap-4"}>
        <button
          className={"py-2 px-8 text-lg hover:bg-[rgba(0,0,0,0.1)]"}
          onClick={() => refetch()}
        >
          <p>시작</p>
        </button>

        <button
          className={"py-2 px-8 text-lg hover:bg-[rgba(0,0,0,0.1)]"}
          onClick={() => handleOpenModal()}
        >
          <p>사건 개요</p>
        </button>

        <button
          className={"py-2 px-8 text-lg hover:bg-[rgba(0,0,0,0.1)]"}
          onClick={() => continueTrial()}
        >
          <p>이어하기</p>
        </button>
      </div>

      <div className={"flex justify-center"}>
        <p className={"font-hakgyo italic text-4xl text-red-800"}>22있소!</p>
      </div>

      <div className={"grid grid-cols-3 w-full"}>
        <div className={"flex flex-col items-center relative"}>
          <LifeHearts maximum={3} left={defenseLife} />
          <NameTag text={"변호사"} />
          <img
            src={Prosecutor}
            alt={"Lawyer"}
            width={"35%"}
            style={{
              transform: "scaleX(-1)",
            }}
          />
        </div>

        <div className={"flex justify-center flex-col items-center"}>
          <NameTag text={"판사"} />
          <img src={Judge} alt={"Judge"} width={"40%"} />
        </div>

        <div className={"flex flex-col items-center"}>
          <LifeHearts maximum={3} left={prosecutorLife} />
          <NameTag text={"검사"} />
          <img src={Lawyer} alt={"Lawyer"} width={"40%"} style={{}} />
        </div>
      </div>

      {trialId ? (
        <div className={"flex flex-col w-full"}>
          <div className={"flex flex-col gap-2"}>
            <p
              className={
                "text-lg bg-slate-800 text-white e p-2 rounded-lg shadow-md"
              }
            >{`${turn}가 말할 차례입니다.`}</p>
            <DialogBox
              displayedText={
                prosecutorMutation.isPending ? "(자료 정리 중)" : displayedText
              }
              speaker={turn}
            />
          </div>

          <Controls onInput={handleInput} currentTurn={turn} />
        </div>
      ) : (
        <DialogBox
          displayedText={"재판을 다시 시작하시려면 '시작' 버튼을 눌러주세요."}
          speaker={turn}
        />
      )}
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
              {trialData != null && (
                <>
                  <p className="mb-4 text-lg ">{trialData.description}</p>
                  <EvidenceList evidenceList={trialData.evidences} />
                </>
              )}

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

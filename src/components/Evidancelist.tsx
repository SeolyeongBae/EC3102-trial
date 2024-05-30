import React from "react";

interface Evidence {
  id: number;
  title: string;
  lawyer: string;
}

const evidenceList: Evidence[] = [
  {
    id: 1,
    title: "서버실 출입 기록",
    lawyer:
      "서버실 출입 기록에 따르면 사건 발생 시간대에 박모 씨 외에도 서버실을 출입한 다른 사람이 있었다.",
  },
  {
    id: 2,
    title: "CCTV 영상",
    lawyer:
      "CCTV 영상에서 박모 씨는 에어컨을 끄는 행동을 하지 않았으며, 다른 사람이 에어컨 근처에 접근하는 모습이 포착되었다.",
  },
  {
    id: 3,
    title: "에어컨 원격 제어 로그",
    lawyer:
      "에어컨이 사건 당시 원격으로 제어된 기록이 있으며, 박모 씨가 원격 제어를 할 수 있는 권한이 없었다.",
  },
  {
    id: 4,
    title: "박모 씨의 알리바이",
    lawyer:
      "박모 씨는 사건 시간에 다른 장소에서 동료와 함께 있었으며, 이 동료가 이를 증언해줄 수 있다.",
  },
  {
    id: 5,
    title: "에어컨 조작 패널의 지문",
    lawyer:
      "에어컨 조작 패널에서 박모 씨의 지문 외에도 다른 사람의 지문이 발견되었다.",
  },
];

const EvidenceList: React.FC = () => {
  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">변호사의 증거 목록</h2>
      <ul className="space-y-2 mx-2">
        {evidenceList.map((evidence, index) => (
          <li key={evidence.id} className="p-2 border-b border-gray-200">
            <p className="font-semibold">
              {index + 1}. {evidence.title}
            </p>
            <p>{evidence.lawyer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EvidenceList;

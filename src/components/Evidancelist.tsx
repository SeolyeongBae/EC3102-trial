import React from "react";

// 이 데이터를 쓸거야. 타입 정의 다시해줘

/*!SECTION
   {
      "상세 내용": "초안과 최종본을 비교해보면 일부 데이터 값이 변경된 것을 확인할 수 있음. 변경된 데이터 값은 실험 결과를 더 긍정적으로 보이게 함.",
      "증거물": "논문 초안 및 제출본",
      "설명": "이모 씨가 작성한 논문의 초안과 최종 제출본."
    },

    */

interface Evidence {
  "상세 내용": string;
  증거물: string;
  설명: string;
}

//이 컴포넌트에서는 evidenceList를 props로 받을거야. 그거 짜줘.

const EvidenceList: React.FC<{ evidenceList: Evidence[] }> = ({
  evidenceList,
}) => {
  return (
    <div className="p-4 mx-auto rounded-xl shadow-md space-y-4 bg-slate-100">
      <h2 className="text-xl font-bold">변호사의 증거 목록</h2>
      <ul className="space-y-2 mx-2">
        {evidenceList.map((evidence, index) => (
          <li key={index} className="p-2 border-b border-gray-200">
            <p className="font-semibold">
              {index + 1}. {evidence["설명"]}
            </p>
            <p>{evidence["상세 내용"]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EvidenceList;

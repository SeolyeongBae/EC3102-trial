export const fetchProsecutorScript = async (trial_id: string) => {
  const response = await fetch(`/api/prosecutor/${trial_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key: "value" }), // 필요한 경우 요청 본문을 추가
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

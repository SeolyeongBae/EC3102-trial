import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { fetchTrialData } from "./apis";

export const useTrialData = (trial_id: string): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["trialData", trial_id],
    queryFn: () => fetchTrialData(trial_id),
    enabled: false, // Initially disabled
  });
};

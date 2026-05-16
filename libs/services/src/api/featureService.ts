import { FeatureCard } from "@blacksof/types";
import { ApiClient } from "../apiClient";

export const FeatureService = {
  getAll: () => {
    return ApiClient.get<FeatureCard[]>("/features");
  },

  getById: (id: string) => {
    return ApiClient.get<FeatureCard>(`/features/${id}`);
  },

  create: (card: Omit<FeatureCard, "id">) => {
    return ApiClient.post<FeatureCard>("/features", card);
  },

  update: (id: string, card: Partial<FeatureCard>) => {
    return ApiClient.put<FeatureCard>(`/features/${id}`, card);
  },

  delete: (id: string) => {
    return ApiClient.delete<FeatureCard>(`/features/${id}`);
  },
};

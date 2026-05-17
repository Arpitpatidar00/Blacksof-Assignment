import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FeatureService } from "@blacksof/services";
import { FeatureCard } from "@blacksof/types";

export const featureKeys = {
  all: ["features"] as const,
  lists: () => [...featureKeys.all, "list"] as const,
  list: (filters: string) => [...featureKeys.lists(), { filters }] as const,
  details: () => [...featureKeys.all, "detail"] as const,
  detail: (id: string) => [...featureKeys.details(), id] as const,
};

export const useFeatures = () => {
  return useQuery({
    queryKey: featureKeys.lists(),
    queryFn: () => FeatureService.getAll(),
  });
};

export const useFeature = (id: string) => {
  return useQuery({
    queryKey: featureKeys.detail(id),
    queryFn: () => FeatureService.getById(id),
    enabled: !!id,
  });
};

export const useCreateFeature = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newCard: Omit<FeatureCard, "id">) => FeatureService.create(newCard),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: featureKeys.lists() });
    },
  });
};

export const useUpdateFeature = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<FeatureCard> }) =>
      FeatureService.update(id, data),
    onSuccess: (data: FeatureCard) => {
      queryClient.invalidateQueries({ queryKey: featureKeys.lists() });
      queryClient.invalidateQueries({ queryKey: featureKeys.detail(data.id) });
    },
  });
};

export const useDeleteFeature = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => FeatureService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: featureKeys.lists() });
    },
  });
};

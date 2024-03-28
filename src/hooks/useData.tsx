import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { notification } from "antd";

export const useData = (key: string) => {
  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/list`
      );
      return response.data;
    },
  });

  if (isError) {
    notification.error({
      message: "An error occurred",
      description: error.message,
    });
  }

  return { data, isLoading, isError, isSuccess, error };
};

export const useMutationData = (key: string) => {
  const { data, isError, error, isSuccess } = useMutation({
    mutationKey: [key],
    mutationFn: async (data: any) => {
      const response = await axios.post(`/api/${key}`, data);
      return response.data;
    },
  });

  if (isError) {
    notification.error({
      message: "An error occurred",
      description: error.message,
    });
  }
};

export default useData;

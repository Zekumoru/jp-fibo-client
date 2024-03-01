import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { IStatusResponse } from './types/response';
import { IFormCardError } from './types/response-errors';
import { useEffect, useState } from 'react';

type FormData = {
  japanese: string;
  english: string;
  kana: string;
  romaji: string;
  progressive: string;
  level: string;
  date: string;
};

type CardMutationOptions = {
  type: 'create' | 'update';
  formData: FormData;
};

const cardMutation: (
  options: CardMutationOptions
) => Promise<IStatusResponse> = async ({ type, formData }) => {
  switch (type) {
    case 'create':
      return (
        await axios.post('http://localhost:3000/jp-card/create', formData, {
          withCredentials: true,
        })
      ).data;
    case 'update':
      return (
        await axios.post(
          `http://localhost:3000/jp-card/${formData.japanese}/update`,
          formData,
          { withCredentials: true }
        )
      ).data;
  }
};

const useCardMutation = () => {
  const [error, setError] = useState<IFormCardError>();
  const {
    mutate: mutateCard,
    data: status,
    error: axiosError,
    isPending,
  } = useMutation<
    IStatusResponse,
    AxiosError<IFormCardError>,
    CardMutationOptions,
    unknown
  >({
    mutationFn: cardMutation,
  });

  useEffect(() => {
    if (axiosError && axiosError.response) {
      const error: IFormCardError = axiosError.response.data;
      return setError(error);
    }

    setError(undefined);
  }, [axiosError]);

  return [mutateCard, status, error, isPending] as const;
};

export default useCardMutation;

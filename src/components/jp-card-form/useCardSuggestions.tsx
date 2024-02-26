import { useEffect, useState } from 'react';
import IJPCard from '../../types/jp-card';
import { IStatusResponse } from './types/response';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

const fetchCardSuggestionsMutation = async (japanese: string) => {
  if (japanese.trim() === '') return [];

  const data: IStatusResponse & {
    results: { [p in keyof IJPCard]: string }[];
  } = (
    await axios.get('http://localhost:3000/jp-card', {
      params: { search: japanese },
    })
  ).data;

  return data.results.map((rawCard) => ({
    id: rawCard.id,
    level: Number(rawCard.level),
    japanese: rawCard.japanese,
    kana: rawCard.kana,
    romaji: rawCard.romaji,
    progressive: rawCard.progressive,
    english: rawCard.english,
    createdAt: new Date(rawCard.createdAt),
  }));
};

const useCardSuggestions = () => {
  const [suggestions, setSuggestions] = useState<IJPCard[]>([]);
  const {
    mutateAsync: fetchSuggestions,
    isPending,
    data,
  } = useMutation<IJPCard[], Error, string, unknown>({
    mutationFn: fetchCardSuggestionsMutation,
    mutationKey: ['cards', 'suggestions'],
  });

  useEffect(() => {
    if (isPending) return;
    setSuggestions(data ?? []);
  }, [data, isPending]);

  return [suggestions, fetchSuggestions] as const;
};

export default useCardSuggestions;

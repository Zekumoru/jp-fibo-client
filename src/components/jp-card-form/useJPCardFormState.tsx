import { useReducer } from 'react';
import jpCardFormReducer from './jp-card-form-reducer';

const useJPCardFormState = () => {
  const [form, formDispatch] = useReducer(
    jpCardFormReducer,
    {
      japanese: '',
      english: '',
      kana: '',
      progressive: '',
      romaji: '',
      level: '',
      date: undefined as unknown as Date,
    },
    (state) => ({ ...state, date: new Date() })
  );

  return [form, formDispatch] as const;
};

export default useJPCardFormState;

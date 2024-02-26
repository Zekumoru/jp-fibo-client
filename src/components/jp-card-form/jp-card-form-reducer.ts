import IJPCard from '../../types/jp-card';

export type JPCardFormState = Pick<
  IJPCard,
  'english' | 'japanese' | 'kana' | 'progressive' | 'romaji'
> & {
  level: string;
  date: Date;
};

export type JPCardFormAction =
  | {
      type:
        | 'set-english'
        | 'set-japanese'
        | 'set-kana'
        | 'set-progressive'
        | 'set-romaji'
        | 'set-level'
        | 'set-date';
      payload: string;
    }
  | {
      type: 'set-by-card';
      payload: IJPCard;
    }
  | {
      type: 'clear' | 'clear-all';
      payload?: never;
    };

const jpCardFormReducer = (
  state: JPCardFormState,
  action: JPCardFormAction
): JPCardFormState => {
  const { type, payload } = action;
  const newState = { ...state };

  switch (type) {
    case 'set-japanese':
      newState.japanese = payload;
      return newState;
    case 'set-english':
      newState.english = payload;
      return newState;
    case 'set-kana':
      newState.kana = payload;
      return newState;
    case 'set-progressive':
      newState.progressive = payload;
      return newState;
    case 'set-romaji':
      newState.romaji = payload;
      return newState;
    case 'set-level':
      newState.level = payload;
      return newState;
    case 'set-date':
      newState.date = new Date(payload);
      return newState;
    case 'set-by-card':
      return {
        japanese: payload.japanese,
        kana: payload.kana,
        english: payload.english,
        progressive: payload.progressive,
        romaji: payload.romaji,
        level: payload.level.toString(),
        date: new Date(payload.createdAt),
      };
    case 'clear':
      newState.japanese = '';
      newState.english = '';
      newState.kana = '';
      newState.progressive = '';
      newState.romaji = '';
      return newState;
    case 'clear-all':
      return {
        english: '',
        japanese: '',
        kana: '',
        level: '',
        progressive: '',
        romaji: '',
        date: new Date(),
      };
    default:
      return state;
  }
};

export default jpCardFormReducer;

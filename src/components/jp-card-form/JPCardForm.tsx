import { useRef, useState } from 'react';
import { format } from 'date-fns';
import IJPCard from '../../types/jp-card';
import TextInput from '../TextInput';
import useJPCardFormState from './useJPCardFormState';
import JapaneseInput from './JapaneseInput';
import useCardMutation from './useCardMutation';

const JPCardForm = () => {
  const [form, formDispatch] = useJPCardFormState();
  const [isModifyEnabled, setIsModifyEnabled] = useState(false);
  const [cardToModify, setCardToModify] = useState<IJPCard>();
  const japaneseInputRef = useRef<HTMLInputElement>();
  const [createCard, status, error] = useCardMutation();

  const modifyCard = (card: IJPCard) => {
    formDispatch({ type: 'set-by-card', payload: card });
    setCardToModify(card);
  };

  const sendRequest = () => {
    const formData = {
      japanese: form.japanese,
      english: form.english,
      kana: form.kana,
      romaji: form.romaji,
      progressive: form.progressive,
      level: form.level,
      date: format(form.date, 'yyyy-MM-dd'),
    };

    if (isModifyEnabled && cardToModify !== null) {
      createCard({ formData, type: 'update' });
    } else {
      createCard({ formData, type: 'create' });
    }

    formDispatch({ type: 'clear' });
    setCardToModify(undefined);
    japaneseInputRef.current?.focus();
  };

  return (
    <div
      style={{
        padding: '16px',
      }}
    >
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
        onSubmit={(e) => {
          e.preventDefault();
          sendRequest();
        }}
      >
        <JapaneseInput
          value={form.japanese}
          errorMessage={error && error.errors?.japanese?.msg}
          cardToModify={cardToModify}
          onCardToModify={modifyCard}
          ref={japaneseInputRef}
          onChange={(japanese) =>
            formDispatch({ type: 'set-japanese', payload: japanese })
          }
        />
        <TextInput
          id="kana"
          label="Kana"
          value={form.kana}
          onChange={(kana) => formDispatch({ type: 'set-kana', payload: kana })}
          errorMessage={error && error.errors?.kana?.msg}
        />
        <TextInput
          id="progressive"
          label="Progressive"
          value={form.progressive}
          onChange={(progressive) =>
            formDispatch({ type: 'set-progressive', payload: progressive })
          }
          errorMessage={error && error.errors?.progressive?.msg}
        />
        <TextInput
          id="romaji"
          label="Romaji"
          value={form.romaji}
          onChange={(romaji) =>
            formDispatch({ type: 'set-romaji', payload: romaji })
          }
          errorMessage={error && error.errors?.romaji?.msg}
        />
        <TextInput
          id="english"
          label="English"
          value={form.english}
          onChange={(english) =>
            formDispatch({ type: 'set-english', payload: english })
          }
          errorMessage={error && error.errors?.english?.msg}
        />
        <TextInput
          id="level"
          label="Level"
          value={form.level}
          onChange={(level) =>
            formDispatch({ type: 'set-level', payload: level })
          }
          errorMessage={error && error.errors?.level?.msg}
        />
        <label htmlFor="date">Date</label>
        <input
          type="date"
          name="date"
          id="date"
          value={format(form.date, 'yyyy-MM-dd')}
          onChange={(e) =>
            formDispatch({ type: 'set-date', payload: e.target.value })
          }
          style={{
            padding: '8px',
          }}
        />
        {error && error.errors?.date && (
          <p style={{ color: 'red' }}>{error.errors.date.msg}</p>
        )}
        <div>
          <label htmlFor="modify-card">Modify card?</label>
          <input
            type="checkbox"
            name="modify-card"
            id="modify-card"
            checked={isModifyEnabled}
            onChange={() => setIsModifyEnabled(!isModifyEnabled)}
          />
        </div>
        <p
          style={{
            marginTop: '8px',
          }}
        >
          Status: {status?.message || error?.message || 'OK'}
        </p>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default JPCardForm;

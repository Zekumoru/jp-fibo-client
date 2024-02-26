import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import TextInput, { TextInputRef } from '../TextInput';
import useCardSuggestions from './useCardSuggestions';
import IJPCard from '../../types/jp-card';

type JapaneseInputRef = HTMLInputElement | undefined | null;

const JapaneseInput = forwardRef<
  JapaneseInputRef,
  {
    value: string;
    errorMessage?: string;
    cardToModify?: IJPCard;
    onCardToModify?: (card: IJPCard) => void;
    onChange: (japanese: string) => void;
  }
>(({ value, errorMessage, cardToModify, onCardToModify, onChange }, ref) => {
  const [suggestions, fetchSuggestions] = useCardSuggestions();
  const jpTextInputRef = useRef<TextInputRef | null>(null);
  const [isOpenSuggestions, setIsOpenSuggestions] = useState(false);

  useImperativeHandle<JapaneseInputRef, JapaneseInputRef>(
    ref,
    () => jpTextInputRef.current?.input ?? null
  );

  useEffect(() => {
    const jpInput = jpTextInputRef.current?.input;
    const jpInputContainer = jpTextInputRef.current?.inputContainer;
    if (!jpInput || !jpInputContainer) return;

    const isElement = (element: unknown): element is Element => {
      return (element as Element).closest !== undefined;
    };
    const focusin = () =>
      setIsOpenSuggestions(!!suggestions && suggestions.length != 0);
    const click = (ev: MouseEvent) => {
      const target = ev.target;
      if (!isElement(target)) return;
      if (target.closest('.japanese-input')) return;
      setIsOpenSuggestions(false);
    };
    const tabKey = (ev: KeyboardEvent) => {
      const target = ev.target;
      if (ev.key !== 'Tab') return;
      if (!isElement(target)) return;
      if (target.closest('.japanese-input')) return;
      setIsOpenSuggestions(false);
    };
    document.addEventListener('click', click);
    document.addEventListener('keyup', tabKey);
    jpInput.addEventListener('focusin', focusin);
    return () => {
      jpInput.removeEventListener('focusin', focusin);
      document.removeEventListener('keyup', tabKey);
      document.removeEventListener('click', click);
    };
  }, [jpTextInputRef, suggestions]);

  useEffect(() => {
    // don't fetch if the same word in suggestions
    if (cardToModify?.japanese === value.trim()) return;
    fetchSuggestions(value);
    setIsOpenSuggestions(true);
  }, [value, cardToModify, fetchSuggestions]);

  return (
    <TextInput
      id="japanese"
      className="japanese-input"
      label="Japanese"
      value={value}
      onChange={onChange}
      errorMessage={errorMessage}
      ref={jpTextInputRef}
    >
      {isOpenSuggestions && (
        <div tabIndex={-1} className="suggestions-box">
          <ul>
            {suggestions &&
              suggestions.map((card) => (
                <li
                  onClick={() => {
                    onCardToModify?.(card);
                    setIsOpenSuggestions(false);
                  }}
                  key={card.japanese}
                >
                  {card.japanese}
                </li>
              ))}
          </ul>
        </div>
      )}
    </TextInput>
  );
});

export default JapaneseInput;

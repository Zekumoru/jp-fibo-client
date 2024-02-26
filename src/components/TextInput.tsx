import { ReactNode, forwardRef, useImperativeHandle, useRef } from 'react';

export interface TextInputRef {
  input: HTMLInputElement | null;
  inputContainer: HTMLDivElement | null;
}

const TextInput = forwardRef<
  TextInputRef,
  {
    id: string;
    className?: string;
    label: string;
    value: string;
    errorMessage?: string;
    onChange?: (value: string) => void;
    children?: ReactNode;
  }
>(({ id, label, value, onChange, errorMessage, className, children }, ref) => {
  const inputContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(ref, () => ({
    get input() {
      return inputRef.current;
    },
    get inputContainer() {
      return inputContainerRef.current;
    },
  }));

  return (
    <div>
      <div
        tabIndex={-1}
        className={className}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
        ref={inputContainerRef}
      >
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          style={{
            padding: '8px',
          }}
          ref={inputRef}
        />
        {children}
      </div>
      {errorMessage && (
        <p style={{ color: 'red', marginTop: '4px' }}>{errorMessage}</p>
      )}
    </div>
  );
});

export default TextInput;

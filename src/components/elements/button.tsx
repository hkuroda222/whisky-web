'use client';
import Link from 'next/link';
import { useRef, ChangeEvent } from 'react';

type ButtonProps = {
  type?: 'submit' | 'button';
  onClick?: () => void;
  text: string;
  disabled?: boolean;
};
export const Button: React.FC<ButtonProps> = (props) => {
  const { type = 'button', onClick, text, disabled } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full p-2 h-12 rounded-md border-solid border-2"
    >
      {text}
    </button>
  );
};

type LinkButtonProps = {
  href: string;
  text: string;
};
export const LinkButton: React.FC<LinkButtonProps> = (props) => {
  const { href, text } = props;
  return (
    <Link
      href={href}
      className="flex justify-center items-center ml-4 max-w-60 w-full p-2 h-12 rounded-md border-solid border-2"
    >
      {text}
    </Link>
  );
};

export const DeleteButton: React.FC = () => (
  <button
    type="button"
    onClick={() => alert('削除しますか？')}
    className="max-w-60 w-full p-2 h-12 rounded-md border-solid border-2 bg-black text-white"
  >
    削除する
  </button>
);

type ButtonWithFileInputProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  text: string;
};
export const ButtonWithFileInput: React.FC<ButtonWithFileInputProps> = (
  props
) => {
  const { onChange, text } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="w-full p-2 h-12 rounded-md border-solid border-2"
      >
        {text}
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={onChange}
        className="hidden"
      />
    </>
  );
};

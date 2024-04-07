'use client';
import Link from 'next/link';

type ButtonProps = {
  onClick: () => void;
  text: string;
  disabled?: boolean;
};
export const Button: React.FC<ButtonProps> = (props) => {
  const { onClick, text, disabled } = props;
  return (
    <button
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
    onClick={() => alert('削除しますか？')}
    className="max-w-60 w-full p-2 h-12 rounded-md border-solid border-2 bg-black text-white"
  >
    削除する
  </button>
);

'use client';
import Link from 'next/link';
import { useRef, type ChangeEvent } from 'react';

type ButtonProps = {
	type?: 'submit' | 'button';
	color: 'white' | 'black';
	onClick?: () => void;
	text: string;
	disabled?: boolean;
};
export const Button: React.FC<ButtonProps> = (props) => {
	const { type = 'button', color, onClick, text, disabled } = props;

	const colorClasses = {
		white: 'bg-white text-black',
		black: 'bg-black text-white',
	};

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`w-full p-2 h-12 rounded-md border-solid border-2 ${
				disabled ? 'opacity-50' : ''
			}
      ${colorClasses[color]}`}
		>
			{text}
		</button>
	);
};

type LinkButtonProps = {
	href: string;
	text: string;
	isBold?: boolean;
};
export const LinkButton: React.FC<LinkButtonProps> = (props) => {
	const { href, text, isBold } = props;
	return (
		<Link
			href={href}
			className={`flex justify-center items-center max-w-60 w-full p-2 h-12 bg-white rounded-md border-solid border-2 ${
				isBold ? 'font-bold' : 'font-nomal'
			}`}
		>
			{text}
		</Link>
	);
};

type FloatingButtonProps = {
	href: string;
	children: React.ReactNode;
};
export const FloatingButton: React.FC<FloatingButtonProps> = (props) => {
	const { href, children } = props;
	return (
		<Link
			href={href}
			className='fixed bottom-12 right-12 flex items-center justify-center w-12 h-12 sm:w-20 sm:h-20 border-solid border-2 sm:border-4 border-gray-600 rounded-full shadow-lg bg-gray-300'
		>
			{children}
		</Link>
	);
};

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
				type='button'
				onClick={() => fileInputRef.current?.click()}
				className='w-full p-2 h-12 rounded-md border-solid border-2'
			>
				{text}
			</button>
			<input
				type='file'
				ref={fileInputRef}
				onChange={onChange}
				className='hidden'
			/>
		</>
	);
};

import type React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/elements/button';
import { Modal } from '@/components/parts/modal';
import { signOut, deleteAccount } from '@/libs/firebase/api/auth';

export const HamburgerMenu: React.FC = () => {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<div className='relative'>
				<div
					onClick={toggleMenu}
					className='flex flex-col justify-between w-6 h-5 cursor-pointer'
				>
					{Array.from({ length: 3 }).map((_, index) => (
						<span
							key={`menu-${index}`}
							className='block w-6 border-gray-600 border-t-2'
						/>
					))}
				</div>
				<div
					className={`fixed z-50 top-0 right-0 h-full w-64 bg-white border-l transform ${
						isOpen ? 'translate-x-0' : 'translate-x-full'
					} transition-transform duration-300 ease-in-out`}
				>
					<div
						onClick={toggleMenu}
						className="absolute w-8 h-8 top-4 right-4 text-gray-500 cursor-pointer hover:text-gray-700
                       before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-y-1/2 before:-translate-x-1/2 before:border-t-solid before:border-2 before:border-gray-500 before:w-6 before:rotate-45 
                       after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-y-1/2 after:-translate-x-1/2 after:border-t-solid after:border-2 after:border-gray-500 after:w-6 after:-rotate-45"
					/>
					<ul className='mt-16'>
						<li
							onClick={async () => {
								await signOut();
								router.push('/');
							}}
							className='block px-4 py-2 border-t-2 text-gray-800 cursor-pointer hover:bg-gray-200'
						>
							サインアウト
						</li>
						<li
							onClick={() => {
								toggleMenu();
								setIsDeleteModalOpen(true);
							}}
							className='block px-4 py-2 border-t-2 border-b-2 text-gray-800 cursor-pointer hover:bg-gray-200'
						>
							アカウント削除
						</li>
					</ul>
				</div>
			</div>
			{isOpen && (
				<div
					className='fixed z-40 inset-0 bg-gray-800 bg-opacity-40'
					onClick={toggleMenu}
				/>
			)}
			{isDeleteModalOpen && (
				<Modal
					onClose={() => {
						setIsDeleteModalOpen(false);
					}}
				>
					<div className='flex flex-col justify-center items-center'>
						<p className='text-lg text-black font-bold'>
							アカウントを削除してよろしいですか？
						</p>
						<div className='mt-2 w-60'>
							<Button
								type='button'
								color='white'
								onClick={async () => {
									toggleMenu();
									deleteAccount();
									router.push('/');
								}}
								text='削除する'
							/>
						</div>
					</div>
				</Modal>
			)}
		</>
	);
};

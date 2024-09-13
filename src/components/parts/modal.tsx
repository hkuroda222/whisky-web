type ModalProps = {
	modalTiele?: string;
	onClose?: () => void;
	children?: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = (props) => {
	const { modalTiele, onClose, children } = props;
	return (
		<>
			<div
				onClick={onClose}
				className='fixed overflow-y-auto overflow-x-hidden top-2/4 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-full h-full max-h-full bg-gray-600/70'
			/>
			<div className='fixed top-2/4 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 p-4 lg:w-[calc(60%_-_1rem)] w-[calc(100%_-_1.5rem)] max-h-full shadow rounded-lg bg-white'>
				{(modalTiele || onClose) && (
					<div className='flex items-center justify-between pb-2 rounded-t dark:border-gray-600'>
						{modalTiele && (
							<p className='text-lg font-semibold'>{modalTiele}</p>
						)}
						{onClose && (
							<div
								onClick={onClose}
								className="relative w-8 h-8 
                       before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-y-1/2 before:-translate-x-1/2 before:border-t-solid before:border-2 before:border-gray-500 before:w-6 before:rotate-45 
                       after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-y-1/2 after:-translate-x-1/2 after:border-t-solid after:border-2 after:border-gray-500 after:w-6 after:-rotate-45"
							/>
						)}
					</div>
				)}
				{children && <div className='mt-2'>{children}</div>}
			</div>
		</>
	);
};

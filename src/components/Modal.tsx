/** @format */

import React from 'react';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	description: string;
};

const Modal = ({ isOpen, onClose, onConfirm, title, description }: Props) => {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
			<div className='bg-white rounded-lg shadow-lg p-6 w-96'>
				<h2 className='text-xl font-bold text-gray-800 mb-4'>{title}</h2>
				<p className='text-gray-600 mb-6'>{description}</p>
				<div className='flex justify-end gap-4'>
					<button
						onClick={onClose}
						className='bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded'>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded'>
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;

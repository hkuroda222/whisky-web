'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button, LinkButton } from '@/components/elements/button';
import { Rating } from '@/components/parts/rating';
import { Modal } from '@/components/parts/modal';
import { getNote, deleteNote, deleteImage } from '@/libs/firebase/api/note';
import { useAuth } from '@/libs/hooks/useAuth';
import { formatDate } from '@/libs/function/formatDate';
import type { NoteType } from '@/type/note';

const DetailPage = ({ params }: { params: { docId: string } }) => {
	const docId = params.docId;
	const signInUser = useAuth();
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const [doneDelete, setDoneDelete] = useState<boolean>(false);
	const [noteData, setNoteData] = useState<NoteType>({
		aging: null,
		alc: null,
		bottled: null,
		bottler: '',
		comment: '',
		date: new Date().getTime(),
		distilleryName: '',
		docId: '',
		finish: '',
		images: [],
		nose: '',
		rating: 0,
		region: '',
		taste: '',
		type: '',
		uid: '',
		vintage: null,
	});

	useEffect(() => {
		(async () => {
			if (docId && signInUser.uid) {
				const noteData = await getNote(signInUser.uid, docId);
				setNoteData(noteData);
			}
		})();
	}, [docId, signInUser.uid]);

	return (
		<>
			<div className='flex'>
				<Image
					src={
						noteData.images.length > 0
							? noteData.images[0]
							: '/images/default.png'
					}
					alt='ボトル画像'
					width={288}
					height={288}
					priority
					className='block shrink-0 object-contain w-40 h-40 sm:w-72 sm:h-72 bg-neutral-200'
				/>
				<div className='ml-4'>
					<h1 className='font-bold text-lg'>
						{noteData.distilleryName}
						{noteData.aging && noteData.aging > 0 && `${noteData.aging}'年'`}
					</h1>
					<div className='mt-2'>
						<Rating
							rating={noteData.rating ? noteData.rating : 0}
							readOnly
							withLabel
						/>
					</div>
					<div className='mt-2'>
						<div className='font-bold'>飲んだ日付</div>
						<div>{formatDate(new Date(noteData.date * 1000))}</div>
					</div>
				</div>
			</div>
			<div className='flex flex-col sm:flex-row mt-4'>
				<div className='w-full sm:w-2/4'>
					<h2 className='font-bold text-lg'>ボトル情報</h2>
					<table className='mt-4 w-full'>
						<tbody>
							<tr className='h-8'>
								<td className='w-1/4 font-bold'>蒸溜所</td>
								<td className='w-3/4'>{noteData.distilleryName}</td>
							</tr>
							<tr className='h-8'>
								<td className='w-1/4 font-bold'>地域</td>
								<td>{noteData.region ? noteData.region : '-'}</td>
							</tr>
							<tr className='h-8'>
								<td className='w-1/4 font-bold'>ボトラー</td>
								<td>{noteData.bottler ? noteData.bottler : '-'}</td>
							</tr>
							<tr className='h-8'>
								<td className='w-1/4 font-bold'>蒸溜</td>
								<td>{noteData.vintage ? `${noteData.vintage}年` : '-'}</td>
							</tr>
							<tr className='h-8'>
								<td className='w-1/4 font-bold'>瓶詰め</td>
								<td>{noteData.bottled ? `${noteData.bottled}年` : '-'}</td>
							</tr>
							<tr className='h-8'>
								<td className='w-1/4 font-bold'>熟成年数</td>
								<td>{noteData.aging ? `${noteData.aging}年` : '-'}</td>
							</tr>
							<tr className='h-8'>
								<td className='w-1/4 font-bold'>度数</td>
								<td>{noteData.alc ? `${noteData.alc}%` : '-'}</td>
							</tr>
							<tr className='h-8'>
								<td className='w-1/4 font-bold'>樽の種類</td>
								<td>{noteData.type ? noteData.type : '-'}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className='mt-4 sm:mt-0 w-full sm:w-2/4'>
					<h2 className='block font-bold text-lg'>テイスティングノート</h2>
					<dl className='mt-4'>
						<dt className='leading-8 font-bold'>香り</dt>
						<dd className='w-full'>{noteData.nose ? noteData.nose : '-'}</dd>
						<dt className='leading-8 mt-3 font-bold'>味</dt>
						<dd>{noteData.taste ? noteData.taste : '-'}</dd>
						<dt className='leading-8 mt-3 font-bold'>余韻</dt>
						<dd>{noteData.finish ? noteData.finish : '-'}</dd>
						<dt className='leading-8 mt-3 font-bold'>総評</dt>
						<dd>{noteData.comment ? noteData.comment : '-'}</dd>
					</dl>
				</div>
			</div>
			<div className='flex justify-center mt-8 pt-8 w-full border-t'>
				<div className='w-60'>
					<Button
						type='button'
						color='black'
						onClick={() => {
							setShowDeleteModal(true);
						}}
						text='削除する'
					/>
				</div>
				<div className='ml-4 w-60'>
					<LinkButton href={`/edit/${docId}/`} text='編集する' />
				</div>
			</div>
			{showDeleteModal && (
				<Modal
					onClose={() => {
						setShowDeleteModal(false);
					}}
				>
					<div className='flex flex-col justify-center items-center'>
						<div className='text-lg font-bold'>
							テイスティングノートを削除してよろしいですか？
						</div>
						<div className='mt-2 w-60'>
							<Button
								type='button'
								color='black'
								onClick={async () => {
									await deleteNote(signInUser.uid, docId);
									if (noteData.images.length > 0) {
										await deleteImage(noteData.images[0]);
									}
									setShowDeleteModal(false);
									setDoneDelete(true);
								}}
								text='削除する'
							/>
						</div>
					</div>
				</Modal>
			)}
			{doneDelete && (
				<Modal>
					<div className='flex flex-col justify-center items-center'>
						<div className='text-lg font-bold'>
							テイスティングノートを削除しました
						</div>
						<div className='mt-2 w-60'>
							<LinkButton href='/list/' text='一覧画面に戻る' />
						</div>
					</div>
				</Modal>
			)}
		</>
	);
};

export default DetailPage;

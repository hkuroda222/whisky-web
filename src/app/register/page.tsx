'use client';
import Image from 'next/image';
import { useState, type ChangeEvent } from 'react';
import { type SubmitHandler, useForm, Controller } from 'react-hook-form';
import { Input, InputItem } from '@/components/elements/input';
import {
	Button,
	LinkButton,
	ButtonWithFileInput,
} from '@/components/elements/button';
import { DatePickerInput } from '@/components/elements/datePicker';
import { Rating } from '@/components/parts/rating';
import { Loading } from '@/components/parts/loading';
import { RegionModal } from '@/components/parts/regionModal';
import { Modal } from '@/components/parts/modal';
import { addNote, uploadImage } from '@/libs/firebase/api/note';
import { useAuth } from '@/libs/hooks/useAuth';
import { useModal } from '@/libs/hooks/useModal';
import type { InitialInputType } from '@/type/note';

const Register = () => {
	const signInUser = useAuth();
	const [imagePreview, setImagePreview] = useState<string>('');
	const [imageFiles, setImageFiles] = useState<Array<File>>([]);
	const [doneSubmit, setDoneSubmit] = useState<boolean>(false);
	const { isOpen, openModal, closeModal } = useModal();

	const {
		handleSubmit,
		control,
		getValues,
		setValue,
		reset,
		formState: { isSubmitting },
	} = useForm<InitialInputType>({
		defaultValues: {
			aging: '',
			alc: '',
			bottled: '',
			bottler: '',
			caskNum: '',
			comment: '',
			date: new Date(),
			distilleryName: '',
			finish: '',
			images: [],
			nose: '',
			rating: 0,
			region: '',
			taste: '',
			type: '',
			vintage: '',
		},
	});

	const onSubmit: SubmitHandler<InitialInputType> = async (data) => {
		const validateData = {
			aging: data.aging ? Number(data.aging) : null,
			alc: data.alc ? Number(data.alc) : null,
			bottled: data.bottled ? Number(data.bottled) : null,
			bottler: data.bottler,
			caskNum: data.caskNum ? Number(data.caskNum) : null,
			comment: data.comment,
			createdAt: new Date().getTime(),
			date: data.date.getTime() / 1000,
			distilleryName: data.distilleryName,
			finish: data.finish,
			nose: data.nose,
			rating: data.rating,
			region: data.region,
			taste: data.taste,
			type: data.type,
			uid: signInUser.uid,
			vintage: data.vintage ? Number(data.vintage) : null,
		};
		if (imageFiles.length > 0) {
			const imageUrl = await uploadImage(imageFiles[0]);
			await addNote({ ...validateData, images: new Array(imageUrl) });
			setDoneSubmit(true);
		} else {
			await addNote({ ...validateData, images: [] });
			setDoneSubmit(true);
		}
	};

	const handleImageSelect = async (e: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		if (selectedFile) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImageFiles([selectedFile]);
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(selectedFile);
		}
	};

	return (
		<>
			{isSubmitting && <Loading />}
			<form onSubmit={handleSubmit(onSubmit)}>
				<h2 className='font-bold text-xl'>ボトルの情報</h2>
				<div className='mt-8'>
					<span className='block font-bold'>・写真を追加する</span>
					<div>
						<div className='mt-4 max-w-48'>
							<ButtonWithFileInput
								onChange={handleImageSelect}
								text='画像を選択'
							/>
						</div>
						{imagePreview ? (
							<Image
								src={imagePreview}
								alt='ボトル画像'
								width={192}
								height={192}
								className='block mt-4 w-48 h-48 object-contain border-solid border-2 border-gray-400'
							/>
						) : (
							<div className='mt-4 w-48 h-48 border-solid border-2 border-gray-400 rounded' />
						)}
					</div>
					<div className='mt-4'>
						<InputItem
							type='text'
							name='distilleryName'
							control={control}
							rules={{
								required: '蒸留所名 / ブランドは必須です',
								maxLength: {
									value: 30,
									message: '文字数は30文字以内です。',
								},
							}}
							label='・蒸留所名 / ブランド'
							placeholder='蒸留所名 / ブランドを入力してください'
							isBold
						/>
					</div>
					<div className='mt-4'>
						<Input
							type='text'
							value={getValues('region')}
							onChange={(e) => {
								setValue('region', e.target.value);
							}}
							label='・地域'
							placeholder='地域を選択してください'
							onClick={openModal}
							readOnly
							isBold
						/>
					</div>
					<div className='mt-4'>
						<InputItem
							type='text'
							name='bottler'
							control={control}
							rules={{
								maxLength: {
									value: 30,
									message: '文字数は30文字以内です。',
								},
							}}
							label='・ボトラー'
							placeholder='ボトラー名を入力してください'
							isBold
						/>
					</div>
					<div className='mt-4 max-w-48'>
						<InputItem
							type='text'
							name='vintage'
							control={control}
							rules={{
								maxLength: {
									value: 4,
									message: '文字数は4文字以内です。',
								},
							}}
							label='・蒸溜年'
							placeholder=''
							inputMode='numeric'
							isBold
							unit='年'
						/>
					</div>
					<div className='mt-4 max-w-48'>
						<InputItem
							type='text'
							name='bottled'
							control={control}
							rules={{
								maxLength: {
									value: 4,
									message: '文字数は4文字以内です。',
								},
							}}
							label='・瓶詰め'
							placeholder=''
							inputMode='numeric'
							isBold
							unit='年'
						/>
					</div>
					<div className='mt-4 max-w-48'>
						<InputItem
							type='text'
							name='aging'
							control={control}
							rules={{
								maxLength: {
									value: 2,
									message: '文字数は2文字以内です。',
								},
							}}
							label='・熟成年数'
							placeholder=''
							inputMode='numeric'
							isBold
							unit='年'
						/>
					</div>
					<div className='mt-4 max-w-48'>
						<InputItem
							type='text'
							name='alc'
							control={control}
							rules={{
								maxLength: {
									value: 5,
									message: '文字数は5文字以内です。',
								},
							}}
							label='・アルコール度数'
							placeholder=''
							inputMode='numeric'
							isBold
							unit='%'
						/>
					</div>
					<div className='mt-4 max-w-48'>
						<InputItem
							type='text'
							name='caskNum'
							control={control}
							rules={{
								maxLength: {
									value: 10,
									message: '文字数は10文字以内です。',
								},
							}}
							label='・カスクナンバー'
							placeholder=''
							inputMode='numeric'
							isBold
							unit='　'
						/>
					</div>
					<div className='mt-4'>
						<InputItem
							type='text'
							name='type'
							control={control}
							rules={{
								maxLength: {
									value: 30,
									message: '文字数は30文字以内です。',
								},
							}}
							label='・樽の種類'
							placeholder='樽の種類を入力してください'
							isBold
						/>
					</div>
				</div>
				<h2 className='mt-8 pt-8 border-solid border-t-2 border-gray-300 font-bold text-xl'>
					テイスティングノート
				</h2>
				<div>
					<span className='block mt-4 font-bold'>・評価</span>
					<Rating
						rating={getValues('rating')}
						onClick={(value) => {
							setValue('rating', value);
						}}
						size={28}
						withLabel
					/>
				</div>
				<div className='mt-4'>
					<InputItem
						type='textarea'
						label='・香り'
						name='nose'
						control={control}
						rules={{
							maxLength: {
								value: 500,
								message: '文字数は500文字以内です。',
							},
						}}
						placeholder='香りを入力してください'
						isBold
					/>
				</div>
				<div className='mt-4'>
					<InputItem
						type='textarea'
						label='・味'
						name='taste'
						control={control}
						rules={{
							maxLength: {
								value: 500,
								message: '文字数は500文字以内です。',
							},
						}}
						placeholder='味を入力してください'
						isBold
					/>
				</div>
				<div className='mt-4'>
					<InputItem
						type='textarea'
						label='・余韻'
						name='finish'
						control={control}
						rules={{
							maxLength: {
								value: 500,
								message: '文字数は500文字以内です。',
							},
						}}
						placeholder='余韻を入力してください'
						isBold
					/>
				</div>
				<div className='mt-4'>
					<InputItem
						type='textarea'
						label='・総評'
						name='comment'
						control={control}
						rules={{
							maxLength: {
								value: 500,
								message: '文字数は500文字以内です。',
							},
						}}
						placeholder='総評を入力してください'
						isBold
					/>
				</div>
				<div className='mt-4'>
					<span className='block font-bold'>・飲んだ日付</span>
					<div className='mt-1'>
						<Controller
							control={control}
							name='date'
							rules={{ required: true }}
							render={({ field: { onChange, value } }) => (
								<DatePickerInput onChange={onChange} selected={value} />
							)}
						/>
					</div>
				</div>
				<div className='mt-4'>
					<Button type='submit' color='white' text='登録する' />
				</div>
			</form>
			{isOpen && (
				<RegionModal
					closeModal={closeModal}
					onSubmit={(data: { region: string }) => {
						setValue('region', data.region);
						closeModal();
					}}
					resetValue={() => reset({ region: '' })}
					value={getValues('region')}
				/>
			)}
			{doneSubmit && (
				<Modal>
					<div className='flex flex-col justify-center items-center'>
						<div className='text-lg font-bold'>登録が完了しました</div>
						<div className='mt-2 w-60'>
							<LinkButton href='/list/' text='一覧画面に戻る' />
						</div>
					</div>
				</Modal>
			)}
		</>
	);
};

export default Register;

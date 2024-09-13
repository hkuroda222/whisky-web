'use client';
import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { InputItem } from '@/components/elements/input';
import { Button } from '@/components/elements/button';
import { Loading } from '@/components/parts/loading';
import { signInWithEmail } from '@/libs/firebase/api/auth';

type InitialInputType = {
	mail: string;
	pass: string;
};

const SignIn = () => {
	const router = useRouter();
	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = useForm<InitialInputType>({
		defaultValues: {
			mail: '',
			pass: '',
		},
	});

	const onSubmit: SubmitHandler<InitialInputType> = async (data) => {
		const user = await signInWithEmail(data);
		if (user) {
			router.push('list');
		}
	};

	return (
		<>
			{isSubmitting && <Loading />}
			<div className='flex justify-center items-center w-full h-full'>
				<form onSubmit={handleSubmit(onSubmit)} className='w-full'>
					<h1 className='font-bold text-center text-2xl'>ログイン</h1>
					{/* <span className="block mt-2">メールアドレスでログインする</span> */}
					<div className='mt-2 w-full'>
						<InputItem
							type='text'
							name='mail'
							control={control}
							rules={{
								required: 'メールアドレスは必須です',
								maxLength: {
									value: 30,
									message: '文字数は30文字以内です。',
								},
								pattern: {
									value:
										/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
									message: 'メールアドレスの入力形式が間違っています。',
								},
							}}
							label='メールアドレス'
							placeholder='sample@taster.com'
						/>
					</div>
					<div className='mt-4 w-full'>
						<InputItem
							type='password'
							name='pass'
							control={control}
							rules={{
								required: 'パスワードは必須です',
								maxLength: {
									value: 20,
									message: '半角英数字6~20文字以内です。',
								},
								pattern: {
									value: /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{6,20}$/i,
									message: 'パスワードは半角英数字6~20文字以内です。',
								},
							}}
							label='パスワード'
							placeholder='半角英数字6~20文字以内'
						/>
					</div>
					<div className='mt-8 w-full'>
						<Button type='submit' color='white' text='ログイン' />
					</div>
					<div className='mt-4 w-full'>
						<Button
							type='button'
							color='white'
							onClick={() => router.push('/signup')}
							text='新規会員登録はこちら'
						/>
					</div>
				</form>
			</div>
		</>
	);
};

export default SignIn;

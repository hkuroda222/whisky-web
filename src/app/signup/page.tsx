'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { InputItem } from '@/components/elements/input';
import { Button } from '@/components/elements/button';
import { Loading } from '@/components/parts/loading';
import { signUpWithEmail } from '@/libs/firebase/api/auth';

type InitialInputType = {
  mail: string;
  pass: string;
  confirmPass: string;
};

const SignIn = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    getValues,
    formState: { isSubmitting },
  } = useForm<InitialInputType>({
    defaultValues: {
      mail: '',
      pass: '',
      confirmPass: '',
    },
  });

  const onSubmit: SubmitHandler<InitialInputType> = async (data) => {
    const user = await signUpWithEmail({
      mail: data.mail,
      pass: data.pass,
    });
    if (user) {
      router.push('list');
    }
  };

  return (
    <>
      {isSubmitting && <Loading />}
      <div className="flex justify-center items-center w-full h-full">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <h1 className="font-bold text-center text-2xl">新規会員登録</h1>
          <div className="mt-2">
            <InputItem
              type="text"
              name="mail"
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
              label="メールアドレス"
              placeholder="sample@taster.com"
            />
          </div>
          <div className="mt-4">
            <InputItem
              type="password"
              name="pass"
              control={control}
              rules={{
                required: 'パスワードは必須です。',
                maxLength: {
                  value: 20,
                  message: '半角英数字6~20文字以内です。',
                },
                pattern: {
                  value: /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{6,20}$/i,
                  message: 'パスワードは半角英数字6~20文字以内です。',
                },
              }}
              label="パスワード"
              placeholder="半角英数字6~20文字以内"
            />
          </div>
          <div className="mt-4">
            <InputItem
              type="password"
              name="confirmPass"
              control={control}
              rules={{
                required: '確認用パスワードは必須です。',
                validate: (value) => {
                  return (
                    value === getValues('pass') || 'パスワードが一致しません'
                  );
                },
              }}
              label="確認用パスワード"
              placeholder="半角英数字6~20文字以内"
            />
          </div>
          <div className="mt-8">
            <Button type="submit" text="登録する" />
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
